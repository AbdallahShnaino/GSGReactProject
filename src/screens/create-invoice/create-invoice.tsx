import { useRef, useState } from "react";
import CreateInvoiceForm from "./form/create-invoice-form";
import PreviewInvoice from "./preview/preview-invoice";
import { IInvoice, InvoiceStatus } from "../../@types";
import { getCurrentDate } from "../../utils/helpers";
<<<<<<< HEAD

=======
import { AuthContext } from "../../providers/auth-provider";
import { ItemStateContext } from "../../providers/items-state.provider";
import { Link } from "react-router-dom";
>>>>>>> master
const CreateInvoiceScreen = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
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
    console.log("invoice ----- ", invoice);
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
