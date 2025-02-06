enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export interface IItem {
  itemId: string;
  itemPrice: number;
  itemQuantity: number;
  itemDiscount: number;
}
export interface IInvoice {
  invoiceId: number;
  invoiceNumber: string;
  invoiceIssueDate: string;
  invoiceDueDate: string;
  invoiceFromBusiness: string;
  invoiceToClient: string;
  invoiceSubTotal: string;
  invoiceTax: string;
  invoiceGrandTotal: string;
  invoiceStatus: InvoiceStatus;
}
