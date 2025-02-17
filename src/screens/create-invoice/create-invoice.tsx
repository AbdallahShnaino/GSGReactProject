import { useContext, useRef, useState } from "react";
import CreateInvoiceForm from "./form/create-invoice-form";
import PreviewInvoice from "./preview/preview-invoice";
import { IInvoice, IItem, InvoiceStatus } from "../../@types";
import { getCurrentDate } from "../../utils/helpers";
import { AuthContext } from "../../providers/auth-provider";
import { ItemStateContext } from "../../providers/items-state.provider";
import { Link } from "react-router-dom";
const CreateInvoiceScreen = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useContext(AuthContext);
  const { state } = useContext(ItemStateContext);
  const [invoice, setInvoice] = useState<IInvoice>({
    invoiceDueDate: "",
    invoiceFromBusiness: "",
    invoiceGrandTotal: 0,
    invoiceId: Math.trunc(Math.random() * 1000000000),
    invoiceIssueDate: getCurrentDate(),
    invoiceNumber: `INV-${Math.trunc(Math.random() * 1000000000)}`,
    invoiceStatus: InvoiceStatus.UNPAID,
    invoiceSubTotal: 0,
    invoiceTax: 0,
    invoiceToClient: "",
    itemsList: [],
  });
  const sendInvoice = (invoice: IInvoice) => {
    setInvoice(() => {
      const items: IItem[] = invoice.itemsList.map(
        (id) =>
          state.itemsList.filter((item: IItem) => item.id == Number(id))[0]
      );
      const itemsAfterDiscount = items.map((item) => {
        const discount = item.price * (item.discount / 100);
        const newItem: IItem = {
          ...item,
          price: Math.trunc(item.price - discount),
        };
        return newItem;
      });
      let subtotalTotal = 0;
      itemsAfterDiscount.forEach((item) => {
        subtotalTotal += item.price;
      });
      const tax = subtotalTotal * (invoice.invoiceTax / 100);

      const grandTotal = subtotalTotal + tax;
      console.log("subtotalTotal ", subtotalTotal);
      console.log("grandTotal ", grandTotal);
      console.log("tax ", tax);

      return {
        ...invoice!,
        invoiceSubTotal: Math.trunc(subtotalTotal),
        invoiceGrandTotal: Math.trunc(grandTotal),
        itemsList: itemsAfterDiscount,
        invoiceFromBusiness: (user && user.name) || "not found",
      };
    });

    setShowPreview(true);
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Link to={"/admin/product"}> products page </Link>
      <CreateInvoiceForm
        invoice={invoice}
        setInvoice={setInvoice}
        sendInvoice={sendInvoice}
      />
      {showPreview && (
        <div ref={previewRef}>
          <PreviewInvoice invoice={invoice} />
        </div>
      )}
    </div>
  );
};

export default CreateInvoiceScreen;
