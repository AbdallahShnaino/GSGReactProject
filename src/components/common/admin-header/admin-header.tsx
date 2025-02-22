import "./admin-header.css";
import { Link, useLocation } from "react-router-dom";
const AdminHeader = () => {
  const { pathname } = useLocation();
  return (
    <>
      <h1>{pathname == "/admin" ? "Admin" : "Products"} Dashboard</h1>
      <nav className="header">
        <ul className="header__nav">
          <li className="header__nav-item">
            <Link to={"/admin/invoice/create"}>Create Invoice</Link>
          </li>
          <li className="header__nav-item">
            <Link to={"/admin/product"}>Product Management</Link>
          </li>
          <li className="header__nav-item">
            <Link to={"/admin"}>Invoices Management</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminHeader;
