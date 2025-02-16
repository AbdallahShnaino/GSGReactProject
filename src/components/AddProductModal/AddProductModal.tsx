import React, { useState, useEffect } from "react";
import { Product } from "../../@types";
import "./addProductModal.css";

interface Props {
    product?: Product;
    onAddProduct: (product: Product) => void;
    onClose: () => void;
}

const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];

const AddProductModal: React.FC<Props> = ({ product, onAddProduct, onClose }) => {
    const [newProduct, setNewProduct] = useState<Product>({
        id: Date.now(),
        name: "",
        price: 0,
        quantity: 0,
        discount: 0,
        category: categories[0],
    });

    const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setNewProduct(product);
        }
    }, [product]);

    const handleSave = () => {
        if (!newProduct.name.trim()) {
            alert("Product name is required!");
            return;
        }

        onAddProduct(newProduct);
        setConfirmationMessage(product ? "Product updated successfully!" : "Product added successfully!");
        setTimeout(() => setConfirmationMessage(null), 2000);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{product ? "Edit Product" : "Quick Add Product"}</h2>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                />

                <input
                    type="number"
                    placeholder="Discount"
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({ ...newProduct, discount: parseFloat(e.target.value) })}
                />

                <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="add-btn" onClick={handleSave}>
                        {product ? "Update Product" : "Add Product"}
                    </button>
                </div>

                {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
            </div>
        </div>
    );
};

export default AddProductModal;
