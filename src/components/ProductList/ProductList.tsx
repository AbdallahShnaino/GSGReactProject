import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ItemStateContext } from "../../providers/items-state.provider";
import AddProductModal from "../AddProductModal/AddProductModal";
import { IItem } from "../../@types";
import { FiMoreVertical } from "react-icons/fi";
import CountShowSettings from "../../components/count-show-settings/count-show-settings";
import eye from "./../../assets/Eye.png";
import "./productList.css";

const ProductList: React.FC = () => {
    const { state, dispatch, loading } = useContext(ItemStateContext);
    const [searchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<IItem | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [showDetailsId, setShowDetailsId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target || !(event.target as HTMLElement).closest(".dropdown-container")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (id: number) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    const toggleDetails = (id: number) => {
        setShowDetailsId((prev) => (prev === id ? null : id));
    };

    const handleAddOrUpdateProduct = (product: IItem) => {
        if (!product.name.trim() || !product.category.trim()) {
            alert("Product name and category are required!");
            return;
        }
        if (selectedProduct) {
            dispatch({ type: "UPDATE_ITEM", payload: product });
            alert("Product updated successfully!");
        } else {
            dispatch({ type: "ADD_ITEM", payload: product });
            alert("Product added successfully!");
        }
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            dispatch({ type: "DELETE_ITEM", payload: id });
            alert("Product deleted successfully!");
        }
    };

    if (loading) return <p>Loading...</p>;

    const filterName = searchParams.get("name")?.toLowerCase() || "";
    const filterCategory = searchParams.get("category")?.toLowerCase() || "";
    const minPrice = Number(searchParams.get("price-min")) || 0;
    const maxPrice = Number(searchParams.get("price-max")) || Infinity;
    const minDiscount = Number(searchParams.get("discount-min")) || 0;
    const maxDiscount = Number(searchParams.get("discount-max")) || 100;

    const filteredProducts = state.itemsList.filter((product) => {
        return (
            product.name.toLowerCase().includes(filterName) &&
            product.category.toLowerCase().includes(filterCategory) &&
            product.price >= minPrice &&
            product.price <= maxPrice &&
            product.discount >= minDiscount &&
            product.discount <= maxDiscount
        );
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="product-list-container">
            <button className="add-btn" onClick={() => setModalOpen(true)}>Add New Product</button>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <React.Fragment key={product.id}>
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.discount}%</td>
                                    <td>{product.category}</td>
                                    <td className="action-cell">
                                        <div className="dropdown-container">
                                            <FiMoreVertical className="more-icon" onClick={() => toggleDropdown(product.id)} />
                                            {openDropdownId === product.id && (
                                                <div className="dropdown-menu">
                                                    <button onClick={() => { setSelectedProduct(product); setModalOpen(true); }}>Edit</button>
                                                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                                                    <button onClick={() => toggleDetails(product.id)}>
                                                        {showDetailsId === product.id ? "Hide Details" : "Show Details"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                                {showDetailsId === product.id && (
                                    <tr className="product-details-row show">
                                        <td colSpan={8}>
                                            <div className="product-details">
                                                <p><strong>Product ID:</strong> {product.id}</p>
                                                <p><strong>Name:</strong> {product.name}</p>
                                                <p><strong>Price:</strong> ${product.price}</p>
                                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                                <p><strong>Discount:</strong> {product.discount}%</p>
                                                <p><strong>Category:</strong> {product.category}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center" }}>No products found.</td>
                        </tr>
                    )}

                </tbody>
            </table>

            <CountShowSettings
                currentPage={currentPage}
                totalPages={totalPages}
                updateItemsPerPage={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
                onPreClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNextClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />

            {modalOpen && (
                <AddProductModal
                    product={selectedProduct}
                    onAddProduct={handleAddOrUpdateProduct}
                    onClose={() => { setModalOpen(false); setSelectedProduct(null); }}
                />
            )}
        </div>
    );
};

export default ProductList;
