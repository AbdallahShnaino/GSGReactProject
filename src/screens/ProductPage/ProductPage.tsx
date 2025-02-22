import Header from "../../components/common/header/header";
import Footer from "../../components/common/footer/footer";
import ProductFilters from "../../components/Product-fillters/Product-fillters";
import ProductList from "../../components/ProductList/ProductList";
import "./productPage.css";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/common/admin-header/admin-header";

function ProductPage() {
  const minPrice = 0;
  const maxPrice = 1000;
  const minDiscount = 0;
  const maxDiscount = 100;

  return (
    <div className="products-dashboard">
      <Header />
      <AdminHeader />
      <ProductFilters
        minPrice={minPrice}
        maxPrice={maxPrice}
        minDiscount={minDiscount}
        maxDiscount={maxDiscount}
      />
      <ProductList />
      <Footer />
    </div>
  );
}

export default ProductPage;
