import "./invoice-row.css";
import { useContext, useState } from "react";
import { IInvoice, InvoiceStatus } from "../../@types";
import eyeIcon from "../../assets/Eye.png";
import pdfIcon from "../../assets/pdf.png";
import { generatePDF } from "../../utils/helpers";
import { InvoicesStateContext } from "../../providers/invoices-state.provider";

const InvoiceRow = (props: IInvoice) => {
  const [showDetails, setShowDetails] = useState(false);
  const invoiceReducer = useContext(InvoicesStateContext);

  const invoiceStatusClass =
    props.invoiceStatus === InvoiceStatus.PAID
      ? "invoice-row__status--paid"
      : "invoice-row__status--unpaid";

  return (
    <>
      <div className="invoice-row__desktop">
        <span>{props.invoiceFromBusiness}</span>
        <span>{props.invoiceNumber}</span>
        <p>
          <span className={invoiceStatusClass}>
            {props.invoiceStatus === InvoiceStatus.PAID ? "Paid" : "Unpaid"}
          </span>
        </p>

        <span>{props.invoiceIssueDate}</span>
        <span>{props.invoiceDueDate}</span>
        <span>{props.invoiceTax}$</span>
        <span>{props.invoiceSubTotal}$</span>
        <span className="invoice-row__grand-total">
          {props.invoiceGrandTotal}$
        </span>
        <span>
          <button
            onClick={() => {
              invoiceReducer.state.invoicesList.find(
                (inv) => inv.invoiceId == props.invoiceId && generatePDF(inv)
              );
            }}
          >
            <img src={pdfIcon} alt="pdf Icon" width={24} height={24} />
          </button>
        </span>
      </div>

      <div className="invoice-row__mobile-tablet">
        <div className="invoice-row__mobile-header">
          <div>
            <p className="invoice-row__business-name">
              From: {props.invoiceFromBusiness}
            </p>
            <p className="invoice-row__business-grand-total">
              Grand Total: {props.invoiceGrandTotal}$
            </p>
            <p>
              <span className={invoiceStatusClass}>
                {props.invoiceStatus === InvoiceStatus.PAID ? "Paid" : "Unpaid"}
              </span>
            </p>
          </div>
          <button onClick={() => setShowDetails(!showDetails)}>
            <img src={eyeIcon} alt="More" className="invoice-row__eye-icon" />
          </button>
        </div>
        {showDetails && (
          <div className="invoice-row__details">
            <p>
              Invoice Number: <span>{props.invoiceNumber}</span>
            </p>
            <p>
              Issue Date: <span>{props.invoiceIssueDate}</span>
            </p>
            <p>
              Due Date: <span>{props.invoiceDueDate}</span>
            </p>
            <p>
              Tax: <span>{props.invoiceTax}$</span>
            </p>
            <p>
              Subtotal: <span>{props.invoiceSubTotal}$</span>
            </p>

            <p className="invoice-row__grand-total">
              Grand Total: <span>{props.invoiceGrandTotal}$</span>
            </p>
            <span>
              <button
                onClick={() => {
                  invoiceReducer.state.invoicesList.find(
                    (inv) =>
                      inv.invoiceId == props.invoiceId && generatePDF(inv)
                  );
                }}
              >
                <img src={pdfIcon} alt="pdf Icon" width={24} height={24} />
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceRow;
