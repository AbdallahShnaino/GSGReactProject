import "./header.css";
import { useState } from "react";
import weGrowLogo from "../../assets/WE_GROW.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
interface IProps{
  activeClass:string
}
const GuestHeader = (props:IProps) => {
  const [hoveredItem, setHoveredItem] = useState(props.activeClass);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <header className="guest-header">
      <div className="header-top">
        <div className="Logo">
          <img src={weGrowLogo} alt="We Grow Logo" className="logo" />
        </div>
        <button className="menu-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
      <ul className={`nav-list ${isSidebarOpen ? "active" : ""}`}
          onMouseLeave={() => setHoveredItem(props.activeClass)}>

        <li 
          className={`nav-item ${hoveredItem === "Home" ? "active" : ""}`}
          onMouseEnter={() => setHoveredItem("Home")}
        >
          <Link className="link" to={"/"}>Home</Link>
        </li>
        <li 
          className={`nav-item ${hoveredItem === "Products" ? "active" : ""}`}
          onMouseEnter={() => setHoveredItem("Products")}
        >
          <Link className="link" to={"/products"}>Products</Link>
        </li>
        <li 
          className={`nav-item ${hoveredItem === "Sign In" ? "active" : ""}`}
          onMouseEnter={() => setHoveredItem("Sign In")}
        >
          <Link className="link" to={"/login"}>Sign In</Link>
        </li>
        <li 
          className={`nav-item ${hoveredItem === "Sign Up" ? "active" : ""}`}
          onMouseEnter={() => setHoveredItem("Sign Up")}
        >
          <Link className="link" to={"/user/create"}>Sign Up</Link>
        </li>
        <div className={`nav-underline ${hoveredItem.toLowerCase().replace(" ", "-")}`}></div>
      </ul>
    </header>

  )
}

export default GuestHeader
