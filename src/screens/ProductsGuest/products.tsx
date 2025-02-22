import GuestHeader from "../../components/guestHeader/guestHeader";
import ItemCard from "../../components/ItemCard/ItemCard";
import RangeSlider from "../../components/common/range-slider/range-slider";
import { useState, useEffect, useContext } from "react";
import { ItemStateContext } from "../../providers/items-state.provider";
import { useSearchParams } from "react-router-dom";
import "./products.css";
import { IItem } from "../../@types";
const Products = () => {
  const min = 0;
  const max = 1000;

  const [name, setName] = useState<string>("");
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<string>("");
  const handleRangeChange =
    (keyMin: string, keyMax: string) => (values: number[]) => {
      const [minValue, maxValue] = values;
      if (minValue !== min) params.set(keyMin, minValue.toString());
      else params.delete(keyMin);

      if (maxValue !== max) params.set(keyMax, maxValue.toString());
      else params.delete(keyMax);

      setParams(params);

      setName(name);
    };

  const { state } = useContext(ItemStateContext);

  const [filteredItems, setFilteredItems] = useState(state.itemsList);
  useEffect(() => {
    const searchName = params.get("name")?.toLowerCase() || "";
    const searchCategory = params.get("category") || "";
    const minPrice = Number(params.get("minPrice")) || min;
    const maxPrice = Number(params.get("maxPrice")) || max;
    let filteredList: IItem[] = state.itemsList;
    if (params.size) {
      if (searchCategory) {
        filteredList = filteredList.filter(
          (item) => item.category.toLowerCase() == searchCategory.toLowerCase()
        );
      }
      if (searchName) {
        filteredList = filteredList.filter((item) =>
          item.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      if (minPrice || maxPrice) {
        filteredList = filteredList.filter(
          (inv) => inv.price >= minPrice && inv.price <= maxPrice
        );
      }

      setFilteredItems((_) => filteredList);
    } else {
      setFilteredItems((_) => state.itemsList);
    }

    console.log("filteredItems ", filteredItems);
  }, [params]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value !== "") {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    setParams(params);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    console.log(value);
    if (value !== "") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    setParams(params);
  };

  return (
    <div className="products-screen">
      <GuestHeader activeClass="Products" />
      <div className="search-section">
        <input
          type="search"
          onChange={(e) => {
            handleNameChange(e);
          }}
          value={name}
          placeholder="Search for products"
          className=""
        />
        <RangeSlider
          min={min}
          max={max}
          hasParam={!!params.get("maxPrice")}
          onChange={handleRangeChange("minPrice", "maxPrice")}
          paramMin={Number(params.get("minPrice")) || min}
          paramMax={Number(params.get("maxPrice")) || max}
        />

        <select
          value={category}
          onChange={(e) => {
            handleCategoryChange(e);
          }}
          name="category"
          id="category"
          className=""
        >
          <option value="">All Categories</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
          <option value="Dairy">Dairy</option>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
      <section className="products-grid">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default Products;
