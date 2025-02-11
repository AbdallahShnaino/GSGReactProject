import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RangeSlider from "../common/range-slider/range-slider";
import "./product-fillters.css";

interface IProps {
    minPrice: number;
    maxPrice: number;
    minDiscount: number;
    maxDiscount: number;
}

const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];

const ProductFilters = (props: IProps) => {
    const [selectedName, setSelectedName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState([props.minPrice, props.maxPrice]);
    const [selectedDiscountRange, setSelectedDiscountRange] = useState([props.minDiscount, props.maxDiscount]);

    const [params, setParams] = useSearchParams();

    const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchClick = () => {
        if (selectedName) {
            params.set("name", selectedName);
        } else {
            params.delete("name");
        }

        if (selectedCategory) {
            params.set("category", selectedCategory);
        } else {
            params.delete("category");
        }

        params.set("price-min", selectedPriceRange[0].toString());
        params.set("price-max", selectedPriceRange[1].toString());

        params.set("discount-min", selectedDiscountRange[0].toString());
        params.set("discount-max", selectedDiscountRange[1].toString());

        setParams(params);
    };

    return (
        <section className="product-filters">
            <div className="filter-element">
                <h3>Name</h3>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={selectedName}
                    onChange={handleNameSearch}
                    id="text-input"
                />
            </div>

            <div className="filter-element">
                <h3>Category</h3>
                <select value={selectedCategory} onChange={handleCategoryChange} id="category-select">
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-element range">
                <h3>Price Range</h3>
                <RangeSlider
                    min={props.minPrice}
                    max={props.maxPrice}
                    onChange={setSelectedPriceRange}
                />
            </div>

            <div className="filter-element range">
                <h3>Discount Range</h3>
                <RangeSlider
                    min={props.minDiscount}
                    max={props.maxDiscount}
                    onChange={setSelectedDiscountRange}
                />
            </div>

            <button className="search-button" onClick={handleSearchClick}>
                Search
            </button>
        </section>
    );
};

export default ProductFilters;
