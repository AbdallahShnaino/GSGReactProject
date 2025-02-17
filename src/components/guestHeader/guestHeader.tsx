import "./header.css";

import weGrowLogo from "../../assets/WE_GROW.png";

const GuestHeader = () => {
  return (
    <header className="guest-header">
      <div className="Logo">
              <img src={weGrowLogo} alt="We Grow Logo" className="logo" />
      </div>
      <ul className="nav-list ">
        <li className="nav-item selected">Products</li>
        <li className="nav-item">Sign In</li>
        <li className="nav-item">Sign Up</li>
      </ul>
    </header>
  )
}


export default GuestHeader
