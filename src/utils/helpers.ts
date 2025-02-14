import { jsPDF } from "jspdf";
import { IInvoice } from "../@types";

export const formateDate = (textDate: string) => {
  const date = new Date(textDate);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
};
export const generatePDF = (invoice: IInvoice) => {
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
