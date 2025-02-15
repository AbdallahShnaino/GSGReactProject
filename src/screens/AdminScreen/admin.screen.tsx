import React, { useState, useEffect } from "react";
import { Search, Calendar, Edit2, Trash2, Download, X } from "lucide-react";
import Header from "../../components/common/header/header";
import { IInvoice, InvoiceStatus } from "../../@types";
import { generatePDF } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import "./admin.screen.css";

interface IProps {
  invoice: IInvoice | null;
  onClose: () => void;
  onSave: (invoice: IInvoice) => void;
}

const EditModal: React.FC<IProps> = ({ invoice, onClose, onSave }) => {
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

const AdminScreen: React.FC = () => {
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
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    let result = invoices;

    const search = params.get("search") || "";
    const paymentStatus = params.get("paymentStatus") || "All Payment Status";
    const dateFrom = params.get("dateFrom") || "";
    const dateTo = params.get("dateTo") || "";

    if (search) {
      result = result.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          invoice.invoiceToClient.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (paymentStatus !== "All Payment Status") {
      result = result.filter(
        (invoice) => invoice.invoiceStatus === paymentStatus
      );
    }

    if (dateFrom) {
      result = result.filter((invoice) => invoice.invoiceIssueDate >= dateFrom);
    }

    if (dateTo) {
      result = result.filter((invoice) => invoice.invoiceIssueDate <= dateTo);
    }

    setFilteredInvoices(result);
  }, [params, invoices]);

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
    generatePDF(invoice);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setParams(params);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name === "paymentStatus" && value === "All Payment Status") {
      params.delete(name);
    } else if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    setParams(params);
  };

  return (
    <div className="invoice-container">
      <Header />
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
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleFilterChange}
        >
          <option>All Payment Status</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>

        <div className="date-filter">
          <Calendar size={20} />
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </div>

        <div className="date-filter">
          <Calendar size={20} />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
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

export default AdminScreen;
