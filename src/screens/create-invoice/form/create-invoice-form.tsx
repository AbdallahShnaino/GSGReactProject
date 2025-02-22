import "./create-invoice-form.css";
import { useContext, useState, useEffect } from "react";
import { IInvoice, IItem, InvoiceStatus } from "../../../@types";
import { ItemStateContext } from "../../../providers/items-state.provider";
import { UsersStateContext } from "../../../providers/users-state.provider";
import { AuthContext } from "../../../providers/auth-provider";

interface IProps {
  sendInvoice: (invoice: IInvoice) => void;
  invoice: IInvoice;
  setInvoice: React.Dispatch<React.SetStateAction<IInvoice>>;
}

const CreateInvoiceForm = ({ sendInvoice, invoice, setInvoice }: IProps) => {
  const itemsContext = useContext(ItemStateContext);
  const usersContext = useContext(UsersStateContext);

  const authContext = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);

  const handleChange = <K extends keyof IInvoice>(
    field: K,
    value: IInvoice[K]
  ) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [field]: value,
    }));
  };

  const filteredItems = itemsContext.state.itemsList.filter(
    (item: IItem) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelection = (item: IItem) => {
    const existingItem = selectedItems.find(
      (selected) => selected.id === item.id
    );

    if (existingItem) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  useEffect(() => {
    const subTotal = selectedItems.reduce(
      (acc, item) =>
        acc + item.price * item.quantity * (1 - item.discount / 100),
      0
    );
    const taxAmount = (subTotal * invoice.invoiceTax) / 100;
    const grandTotal = subTotal + taxAmount;

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      itemsList: selectedItems,
      invoiceSubTotal: subTotal,
      invoiceGrandTotal: grandTotal,
      invoiceFromBusiness: authContext.user?.name!,
    }));
  }, [selectedItems, invoice.invoiceTax]);

  return (
    <>
      <div className="create-invoice-form">
        <h1 className="form-title">create invoice</h1>
        <div className="create-invoice__input">
          <input
            className="input cs-input"
            id="invoiceNumber"
            type="text"
            placeholder="Invoice Number (Auto-generated if left blank)"
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
          />
        </div>

        <div className="create-invoice__input">
          <select
            className="input cs-input"
            id="invoiceToClient"
            value={invoice.invoiceToClient}
            onChange={(e) => handleChange("invoiceToClient", e.target.value)}
          >
            {usersContext.state.usersList.length > 0 ? (
              usersContext.state.usersList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option disabled>No clients found</option>
            )}
          </select>
        </div>
        <div className="create-invoice__input">
          <select
            value={invoice.invoiceStatus}
            onChange={(e) =>
              handleChange("invoiceStatus", e.target.value as InvoiceStatus)
            }
          >
            <option value={InvoiceStatus.PAID}>Paid</option>
            <option value={InvoiceStatus.UNPAID}>Unpaid</option>
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
            placeholder="Invoice Tax (%)"
            value={invoice.invoiceTax}
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
        <div className="item-selection">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="item-row">
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (selected) => selected.id === item.id
                  )}
                  onChange={() => handleItemSelection(item)}
                />
                <span>{`${item.name} | $${item.price} | Discount: ${item.discount}%`}</span>
                {selectedItems.some((selected) => selected.id === item.id) && (
                  <input
                    type="number"
                    min="1"
                    value={
                      selectedItems.find((selected) => selected.id === item.id)
                        ?.quantity || 1
                    }
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                )}
              </div>
            ))
          ) : (
            <p>No matching products found</p>
          )}
        </div>

        <div className="summary">
          <p>Subtotal: ${invoice.invoiceSubTotal.toFixed(2)}</p>
          <p>
            Tax ({invoice.invoiceTax}%): $
            {((invoice.invoiceSubTotal * invoice.invoiceTax) / 100).toFixed(2)}
          </p>
          <p>
            <strong>
              Grand Total: ${invoice.invoiceGrandTotal.toFixed(2)}
            </strong>
          </p>
        </div>

        <button className="login-btn" onClick={() => sendInvoice(invoice)}>
          Next
        </button>
      </div>
    </>
  );
};

export default CreateInvoiceForm;
