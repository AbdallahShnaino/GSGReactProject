export enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export interface IItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  category: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  category: string;
}
export interface IInvoice {
  invoiceId: number;
  invoiceNumber: string;
  invoiceIssueDate: string;
  invoiceDueDate: string;
  invoiceFromBusiness: string;
  invoiceToClient: string;
  invoiceSubTotal: number;
  invoiceTax: number;
  invoiceGrandTotal: number;
  invoiceStatus: InvoiceStatus;
}
export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  GUEST = "GUEST",
}
