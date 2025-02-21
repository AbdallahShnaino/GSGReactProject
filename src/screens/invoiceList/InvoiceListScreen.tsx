import React, { useState, useEffect } from "react";
import { Search, Calendar, Edit2, Trash2, Download, X } from "lucide-react";
import { IInvoice, InvoiceStatus } from "../../@types";
import Logo from "../../assets/WE_GROW.png";
import "./invoiceListScreen.css";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

interface EditModalProps {
  invoice: IInvoice | null;
  onClose: () => void;
  onSave: (invoice: IInvoice) => void;
}

const EditModal: React.FC<EditModalProps> = ({ invoice, onClose, onSave }) => {
  const [editedInvoice, setEditedInvoice] = useState<IInvoice>(
    invoice || {
      invoiceId: 0,
      invoiceNumber: "",
      invoiceIssueDate: "",
      invoiceDueDate: "",
      invoiceFromBusiness: "",
      invoiceToClient: "",
      invoiceSubTotal: 0,
      invoiceTax: 0,
      invoiceGrandTotal: 0,
      invoiceStatus: InvoiceStatus.UNPAID,
      itemsList: [],
    }
  );

  useEffect(() => {
    if (invoice) {
      setEditedInvoice(invoice);
    }
  }, [invoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedInvoice);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setEditedInvoice((prev) => ({
      ...prev,
      [id]:
        id === "invoiceSubTotal" ||
        id === "invoiceTax" ||
        id === "invoiceGrandTotal"
          ? parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Invoice</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              type="text"
              id="invoiceNumber"
              value={editedInvoice.invoiceNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoiceToClient">Client Name</label>
            <input
              type="text"
              id="invoiceToClient"
              value={editedInvoice.invoiceToClient}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoiceSubTotal">Total Amount</label>
            <input
              type="number"
              id="invoiceSubTotal"
              value={editedInvoice.invoiceSubTotal}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoiceStatus">Payment Status</label>
            <select
              id="invoiceStatus"
              value={editedInvoice.invoiceStatus}
              onChange={handleChange}
            >
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InvoiceListScreen: React.FC = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([
    {
      invoiceId: 1,
      invoiceNumber: "INV-001",
      invoiceIssueDate: "2024-03-15",
      invoiceDueDate: "2024-04-15",
      invoiceFromBusiness: "We Grow",
      invoiceToClient: "khaseeb",
      invoiceSubTotal: 150.0,
      invoiceTax: 15.0,
      invoiceGrandTotal: 165.0,
      invoiceStatus: InvoiceStatus.PAID,
      itemsList: [],
    },
    {
      invoiceId: 2,
      invoiceNumber: "INV-002",
      invoiceIssueDate: "2024-03-16",
      invoiceDueDate: "2024-04-16",
      invoiceFromBusiness: "We Grow",
      invoiceToClient: "sarry sultan",
      invoiceSubTotal: 200.0,
      invoiceTax: 20.0,
      invoiceGrandTotal: 220.0,
      invoiceStatus: InvoiceStatus.UNPAID,
      itemsList: [],
    },
    {
      invoiceId: 3,
      invoiceNumber: "INV-003",
      invoiceIssueDate: "2024-03-17",
      invoiceDueDate: "2024-04-17",
      invoiceFromBusiness: "We Grow",
      invoiceToClient: "Amjad Shabaneh",
      invoiceSubTotal: 250.0,
      invoiceTax: 20.0,
      invoiceGrandTotal: 270.0,
      invoiceStatus: InvoiceStatus.UNPAID,
      itemsList: [],
    },
    {
      invoiceId: 4,
      invoiceNumber: "INV-004",
      invoiceIssueDate: "2024-03-18",
      invoiceDueDate: "2024-04-18",
      invoiceFromBusiness: "We Grow",
      invoiceToClient: "Abdallah",
      invoiceSubTotal: 300.0,
      invoiceTax: 20.0,
      invoiceGrandTotal: 320.0,
      invoiceStatus: InvoiceStatus.PAID,
      itemsList: [],
    },
    {
      invoiceId: 5,
      invoiceNumber: "INV-005",
      invoiceIssueDate: "2024-03-20",
      invoiceDueDate: "2024-04-20",
      invoiceFromBusiness: "We Grow",
      invoiceToClient: "Mohammad khasati",
      invoiceSubTotal: 500.0,
      invoiceTax: 15.0,
      invoiceGrandTotal: 515.0,
      invoiceStatus: InvoiceStatus.UNPAID,
      itemsList: [],
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    paymentStatus: "All Payment Status",
    dateFrom: "",
    dateTo: "",
  });

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [editingInvoice, setEditingInvoice] = useState<IInvoice | null>(null);

  useEffect(() => {
    let result = invoices;

    if (filters.search) {
      const searchTerm = filters.search.trim().toLowerCase();
      result = result.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
          invoice.invoiceToClient.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.paymentStatus !== "All Payment Status") {
      result = result.filter(
        (invoice) => invoice.invoiceStatus === filters.paymentStatus
      );
    }

    if (filters.dateFrom) {
      result = result.filter(
        (invoice) => invoice.invoiceIssueDate >= filters.dateFrom
      );
    }

    if (filters.dateTo) {
      result = result.filter(
        (invoice) => invoice.invoiceIssueDate <= filters.dateTo
      );
    }

    setFilteredInvoices(result);
  }, [filters, invoices]);

  const handleDelete = (id: number) => {
    setInvoices(invoices.filter((invoice) => invoice.invoiceId !== id));
  };

  const handleEdit = (invoice: IInvoice) => {
    setEditingInvoice(invoice);
  };

  const handleSaveEdit = (editedInvoice: IInvoice) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.invoiceId === editedInvoice.invoiceId ? editedInvoice : invoice
      )
    );
    setEditingInvoice(null);
  };

  const handleExport = (invoice: IInvoice) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${invoice.invoiceIssueDate}`, 20, 50);
    doc.text("Bill To:", 20, 70);
    doc.text(invoice.invoiceToClient, 20, 80);
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 100, 170, 10, "F");
    doc.text("Description", 25, 107);
    doc.text("Amount", 160, 107, { align: "right" });
    doc.text("Total Amount:", 120, 130);
    doc.text(`$${invoice.invoiceSubTotal.toFixed(2)}`, 160, 130, {
      align: "right",
    });
    doc.text("Payment Status:", 120, 140);
    doc.text(invoice.invoiceStatus, 160, 140, { align: "right" });
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 270, { align: "center" });
    doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
  };

  return (
    <div className="invoice-container">
      <header className="logo">
        <img src={Logo} draggable="false" alt="We Grow" />
      </header>

      <div className="invoice-header">
        <h1>Invoices</h1>
      </div>
      <nav>
        <Link to="/admin/invoice/create">Create Invoice</Link>
        <Link to="/admin/product">Products Management</Link>
      </nav>
      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by Invoice No or Client Name"
            value={filters.search}
            autoFocus
            onChange={handleSearchChange}
            onBlur={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value.trim() }))
            }
          />
        </div>

        <select
          value={filters.paymentStatus}
          onChange={(e) =>
            setFilters({ ...filters, paymentStatus: e.target.value })
          }
        >
          <option>All Payment Status</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>

        <div className="date-filter">
          <Calendar size={20} />
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
          />
        </div>

        <div className="date-filter">
          <Calendar size={20} />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>

        <button className="filter-button">Filter</button>
        <button className="add-invoice-button">Add Invoice</button>
      </div>

      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Client Name</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.invoiceToClient}</td>
                <td>${invoice.invoiceSubTotal.toFixed(2)}</td>
                <td>
                  <span
                    className={`status-badge ${invoice.invoiceStatus.toLowerCase()}`}
                  >
                    {invoice.invoiceStatus}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(invoice)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(invoice.invoiceId)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                  <button
                    className="action-button export"
                    onClick={() => handleExport(invoice)}
                  >
                    <Download size={16} />
                    Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingInvoice && (
        <EditModal
          invoice={editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default InvoiceListScreen;
