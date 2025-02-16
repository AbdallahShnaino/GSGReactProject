import { useContext } from "react";
import { IInvoice, IItem } from "../../../@types";
import "./preview-invoice.css";
import { InvoicesStateContext } from "../../../providers/invoices-state.provider";
import { generatePDF } from "../../../utils/helpers";
import { ItemStateContext } from "../../../providers/items-state.provider";

interface IProps {
  invoice: IInvoice;
}
const PreviewInvoice = ({ invoice }: IProps) => {
  const { dispatch, state } = useContext(InvoicesStateContext);
  const items = useContext(ItemStateContext);
  console.log("--invoice from perview--", invoice);

  const handleSubmit = () => {
    console.log("final invoice ", invoice);
    onSubmit(invoice);
  };

  const onSubmit = (invoice: IInvoice) => {
    dispatch({ type: "ADD_INVOICE", payload: invoice });
  };
  return (
    <div className="invoice-overview">
      <h3>Invoice Overview</h3>
      <p>
        <strong>Invoice Number:</strong> {invoice.invoiceNumber}
      </p>
      <p>
        <strong>Issued Date:</strong> {invoice.invoiceIssueDate}
      </p>
      <p>
        <strong>Due Date:</strong> {invoice.invoiceDueDate || "Not Set"}
      </p>
      <p>
        <strong>From:</strong>{" "}
        {invoice.invoiceFromBusiness || "Unknown Business"}
      </p>
      <p>
        <strong>To:</strong> {invoice.invoiceToClient || "Unknown Client"}
      </p>
      <p>
        <strong>Subtotal:</strong> ${invoice.invoiceSubTotal.toFixed(2)}
      </p>
      <p>
        <strong>Tax:</strong> {invoice.invoiceTax.toFixed(2)} %
      </p>
      <p>
        <strong>List of Items:</strong>
        <table>
          <thead>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Discount</th>
          </thead>
          <tbody>
            {invoice.itemsList.map((item) => {
              const myItem = item as IItem;
              return (
                <tr>
                  <td>{myItem.id}</td>
                  <td>{myItem.price}$</td>
                  <td>{myItem.category}</td>
                  <td>{myItem.discount}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </p>
      <p>
        <strong>Grand Total:</strong> ${invoice.invoiceGrandTotal.toFixed(2)}
      </p>
      <p>
        <strong>Status:</strong>
        <span className={`status ${invoice.invoiceStatus.toLowerCase()}`}>
          {invoice.invoiceStatus}
        </span>
      </p>
      <button onClick={handleSubmit}>Create Invoice</button>
      <button onClick={() => generatePDF(items.state, invoice)}>
        Get As PDF
      </button>
    </div>
  );
};

export default PreviewInvoice;
