import GuestHeader from "../../components/guestHeader/guestHeader";
import ItemCard from "../../components/ItemCard/ItemCard";
import RangeSlider from "../../components/common/range-slider/range-slider";
import { useState, useEffect } from "react";

import {  useSearchParams } from "react-router-dom";
import "./products.css";
const Products = () => {
  const min = 0;
  const max = 20;

  const [name,setName] = useState<string>("");
  const [params,setParams] = useSearchParams();
  const [category,setCategory] = useState<string>("");
  const handleRangeChange = (keyMin: string, keyMax: string) => (values: number[]) => {
    const [minValue, maxValue] = values;
    if (minValue !== min) params.set(keyMin, minValue.toString());
    else params.delete(keyMin);

    if (maxValue !== max) params.set(keyMax, maxValue.toString());
    else params.delete(keyMax);

    setParams(params);
   
    setName(name);
  };




  const [filteredItems, setFilteredItems] = useState(sampleItems);

  useEffect(() => {
    const searchName = params.get('name')?.toLowerCase() || '';
    const searchCategory = params.get('category') || '';
    const minPrice = Number(params.get('minPrice')) || min;
    const maxPrice = Number(params.get('maxPrice')) || max;

    const filtered = sampleItems.filter(item => {
      const matchesName = item.name.toLowerCase().includes(searchName);
      const matchesCategory = searchCategory ? item.category === searchCategory : true;
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      return matchesName && matchesCategory && matchesPrice;
    });



    setFilteredItems(filtered);
  }, [params]);


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value !== "") {
      params.set('name', value);
    } else {
      params.delete('name');
    }
    setParams(params);

  }
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    console.log(value)
    if (value !== "") {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    setParams(params);

    }

  return (
    <div className="products-screen">
      <GuestHeader/>
      <div className="search-section">
        <input type="search" onChange={(e)=>{handleNameChange(e)}} value={name} placeholder="Search for products" className=""/>
       <RangeSlider
          min={min}
          max={max}
          hasParam={!!params.get("maxPrice")}
          onChange={handleRangeChange("minPrice", "maxPrice")}
          paramMin={Number(params.get("minPrice")) || min}
          paramMax={Number(params.get("maxPrice")) || max}
        />

        <select value={category} onChange={(e)=>{handleCategoryChange(e)}} name="category" id="category" className="">
          <option value="">All Categories</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
          <option value="Dairy">Dairy</option>
          <option value="Fruits">Fruits</option>
          <option value="Snacks">Snacks</option>


        </select>
        
      </div>
      <section className="products-grid" >
        {filteredItems.map(item => (

          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  )
}



export default Products
