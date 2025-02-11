enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export interface IItem {
  itemId: string;
  itemName: string;
  itemDescription: string;
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
export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  GUEST = "GUEST",
}
export interface IUser {
  clientId :string;
  clientName : string;
  clientEmail:string;
  clientAddress :string;
  clientPhone:string;
  clientPassword:string;
}