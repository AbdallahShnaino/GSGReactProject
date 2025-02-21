  import "./create-invoice-form.css";
import { useContext, useState } from "react";
import { IInvoice } from "../../../@types";
import { ItemStateContext } from "../../../providers/items-state.provider";
interface IProps {
  sendInvoice: (invoice: IInvoice) => void;
  invoice: IInvoice;
  setInvoice: React.Dispatch<React.SetStateAction<IInvoice>>;
}
const CreateInvoiceForm = ({ sendInvoice, invoice, setInvoice }: IProps) => {
  const itemsContext = useContext(ItemStateContext);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search term state

  const handleChange = (field: string, value: any) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const filteredItems = itemsContext.state.itemsList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onItemPickerChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setInvoice({ ...invoice, itemsList: selectedValues });
  }

  return (
    <>
      <div className="create-invoice-form">
        <h1 className="form-title">create invoice</h1>
        <div className="create-invoice__input">
          <input
          className="input cs-input"
            id="invoiceNumber"
            type="text"
            placeholder="Invoice Number (leave it blank for auto generated ID)"
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
          />
        </div>

        <div className="create-invoice__input">
          <input
          className="input cs-input"
            id="invoiceToClient"
            type="string"
            placeholder="Client Id"
            onChange={(e) => handleChange("invoiceToClient", e.target.value)}
          />
        </div>
        <div className="create-invoice__input">
          <select
          className="input cs-input"
            onChange={(e) => handleChange("invoiceStatus", e.target.value)}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div className="create-invoice__input">
          <input
          className="input cs-input"
            id="invoiceDueDate"
            type="date"
            placeholder="Invoice Due Date"
            onChange={(e) => handleChange("invoiceDueDate", e.target.value)}
          />
        </div>
        <div className="create-invoice__input">
          <input
          className="input cs-input"
            id="invoiceTax"
            type="number"
            placeholder="Invoice Tax in %"
            onChange={(e) => handleChange("invoiceTax", Number(e.target.value))}
          />
        </div>
        <div className="create-invoice__input">
          <input
          className="input cs-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="create-invoice__input">
          <select className="input cs-input" multiple onChange={onItemPickerChange}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {`Category: ${item.category} | Name: ${item.name} | Price: $${item.price} | Discount: ${item.discount}%`}
                </option>
              ))
            ) : (
              <option disabled>No matching products found</option>
            )}
          </select>
        </div>

        <button className="login-btn" onClick={() => sendInvoice(invoice)}>Next</button>
      </div>
    </>
  );
};

export default CreateInvoiceForm;
