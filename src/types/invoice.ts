export interface Invoice {
  id: string;
  invoiceNo: string;
  clientName: string;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid';
  createdAt: string;
}

export interface InvoiceFilters {
  search: string;
  paymentStatus: string;
  dateFrom: string;
  dateTo: string;
}