import "./invoice-row.css";
import { useState } from "react";
import { IInvoice, InvoiceStatus } from "../../@types";
import eyeIcon from "../../assets/Eye.png";
import pdfIcon from "../../assets/pdf.png";
import { jsPDF } from "jspdf";

const InvoiceRow = (props: IInvoice) => {
  const [showDetails, setShowDetails] = useState(false);

  const invoiceStatusClass =
    props.invoiceStatus === InvoiceStatus.PAID
      ? "invoice-row__status--paid"
      : "invoice-row__status--unpaid";

  const generatePDF = (invoice: IInvoice) => {
    const doc = new jsPDF();
    let yPosition = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Invoice", 14, yPosition);

    yPosition += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, yPosition);

    yPosition += 10;
    doc.text(`Issue Date: ${invoice.invoiceIssueDate}`, 14, yPosition);

    yPosition += 10;
    doc.text(`Due Date: ${invoice.invoiceDueDate}`, 14, yPosition);

    yPosition += 10;
    doc.setFontSize(14);
    doc.text("From:", 14, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.text(invoice.invoiceFromBusiness, 14, yPosition);

    yPosition += 15;
    doc.setFontSize(14);
    doc.text("To:", 14, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.text(invoice.invoiceToClient, 14, yPosition);

    yPosition += 15;
    doc.setLineWidth(0.5);
    doc.line(10, yPosition, 200, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Item", 14, yPosition);
    doc.text("Description", 50, yPosition);
    doc.text("Quantity", 120, yPosition);
    doc.text("Price", 150, yPosition);
    doc.text("Total", 180, yPosition);

    yPosition += 10;
    doc.setLineWidth(0.5);
    doc.line(10, yPosition + 5, 200, yPosition + 5);

    yPosition += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 120, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`$${invoice.invoiceSubTotal}`, 180, yPosition);

    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Tax:", 120, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`$${invoice.invoiceTax}`, 180, yPosition);

    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total:", 120, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`$${invoice.invoiceGrandTotal}`, 180, yPosition);

    yPosition += 20;
    doc.setFont("helvetica", "bold");
    doc.text(`Status: ${invoice.invoiceStatus}`, 14, yPosition);

    yPosition += 10;
    doc.setFontSize(10);
    doc.text("Thank you!", 14, yPosition);

    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

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
          <button onClick={() => generatePDF(props)}>
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
              <button onClick={() => generatePDF(props)}>
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
