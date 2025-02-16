import { jsPDF } from "jspdf";
import { IInvoice, IItem } from "../@types";
import { State } from "../state/items.reducer";

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
export const generatePDF = (state: State, invoice: IInvoice) => {
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
  doc.text("Price", 150, yPosition);
  doc.text("Discount (%)", 180, yPosition);

  invoice.itemsList.forEach((item) => {
    const itemInInvoice = item as IItem;

    state.itemsList.forEach((itemInStorage) => {
      console.log(itemInInvoice.id);
      console.log(itemInInvoice.id);

      if (itemInInvoice.id == itemInStorage.id) {
        yPosition += 10;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(itemInStorage.name, 14, yPosition);
        doc.text(itemInStorage.price.toString(), 150, yPosition);
        doc.text(itemInStorage.discount.toString(), 180, yPosition);
      }
    });
  });

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
  doc.text(`${invoice.invoiceTax}%`, 180, yPosition);

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

export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
  const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
  return `${year}-${month}-${day}`;
};
