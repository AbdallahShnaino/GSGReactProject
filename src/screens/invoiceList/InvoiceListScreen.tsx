import React, { useState, useEffect } from "react";
import { Search, Calendar, Edit2, Trash2, Download, X } from "lucide-react";
import { Invoice } from "../../types/invoice";
import Logo from "../../assets/WE_GROW.png";
import "./invoiceListScreen.css";
import jsPDF from "jspdf";

interface EditModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
}

const EditModal: React.FC<EditModalProps> = ({ invoice, onClose, onSave }) => {
  const [editedInvoice, setEditedInvoice] = useState<Invoice>(
    invoice || {
      id: "",
      invoiceNo: "",
      clientName: "",
      totalAmount: 0,
      paymentStatus: "Unpaid",
      createdAt: "",
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
      [id]: id === "totalAmount" ? parseFloat(value) : value,
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
            <label htmlFor="invoiceNo">Invoice Number</label>
            <input
              type="text"
              id="invoiceNo"
              value={editedInvoice.invoiceNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              value={editedInvoice.clientName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="number"
              id="totalAmount"
              value={editedInvoice.totalAmount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentStatus">Payment Status</label>
            <select
              id="paymentStatus"
              value={editedInvoice.paymentStatus}
              onChange={handleChange}
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
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
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNo: "INV-001",
      clientName: "khaseeb",
      totalAmount: 150.0,
      paymentStatus: "Paid",
      createdAt: "2024-03-15",
    },
    {
      id: "2",
      invoiceNo: "INV-002",
      clientName: "sarry sultan",
      totalAmount: 200.0,
      paymentStatus: "Unpaid",
      createdAt: "2024-03-16",
    },
    {
      id: "3",
      invoiceNo: "INV-003",
      clientName: "khasati",
      totalAmount: 500.0,
      paymentStatus: "Paid",
      createdAt: "2024-03-17",
    },
    {
      id: "4",
      invoiceNo: "INV-004",
      clientName: "abdullah",
      totalAmount: 750.0,
      paymentStatus: "Unpaid",
      createdAt: "2024-03-18",
    },
    {
      id: "5",
      invoiceNo: "INV-005",
      clientName: "amjad shabneh",
      totalAmount: 300.0,
      paymentStatus: "Paid",
      createdAt: "2024-03-19",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    paymentStatus: "All Payment Status",
    dateFrom: "",
    dateTo: "",
  });

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    let result = invoices;

    if (filters.search) {
      const searchTerm = filters.search.trim().toLowerCase();
      result = result.filter(
        (invoice) =>
          invoice.invoiceNo.toLowerCase().includes(searchTerm) ||
          invoice.clientName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.paymentStatus !== "All Payment Status") {
      result = result.filter(
        (invoice) => invoice.paymentStatus === filters.paymentStatus
      );
    }

    if (filters.dateFrom) {
      result = result.filter(
        (invoice) => invoice.createdAt >= filters.dateFrom
      );
    }

    if (filters.dateTo) {
      result = result.filter((invoice) => invoice.createdAt <= filters.dateTo);
    }

    setFilteredInvoices(result);
  }, [filters, invoices]);

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
  };

  const handleSaveEdit = (editedInvoice: Invoice) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === editedInvoice.id ? editedInvoice : invoice
      )
    );
    setEditingInvoice(null);
  };

  const handleExport = (invoice: Invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceNo}`, 20, 40);
    doc.text(`Date: ${invoice.createdAt}`, 20, 50);
    doc.text("Bill To:", 20, 70);
    doc.text(invoice.clientName, 20, 80);
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 100, 170, 10, "F");
    doc.text("Description", 25, 107);
    doc.text("Amount", 160, 107, { align: "right" });
    doc.text("Total Amount:", 120, 130);
    doc.text(`$${invoice.totalAmount.toFixed(2)}`, 160, 130, {
      align: "right",
    });
    doc.text("Payment Status:", 120, 140);
    doc.text(invoice.paymentStatus, 160, 140, { align: "right" });
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 270, { align: "center" });
    doc.save(`invoice_${invoice.invoiceNo}.pdf`);
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
          <option>Paid</option>
          <option>Unpaid</option>
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
              <tr key={invoice.id}>
                <td>{invoice.invoiceNo}</td>
                <td>{invoice.clientName}</td>
                <td>${invoice.totalAmount.toFixed(2)}</td>
                <td>
                  <span
                    className={`status-badge ${invoice.paymentStatus.toLowerCase()}`}
                  >
                    {invoice.paymentStatus}
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
                    onClick={() => handleDelete(invoice.id)}
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
