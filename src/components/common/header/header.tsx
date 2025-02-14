import "./header.css";
import logo from "./../../../assets/WE_GROW.png";
import logout from "./../../../assets/log-out.png";

const Header = () => {
  return (
    <nav className="header">
      <ul className="header__nav">
        <li className="header__nav-item">
          <img className="header__logo" src={logo} alt="logo" />
        </li>
        <li className="header__logout-text">Logout</li>
      </ul>
      <button className="header__logout-btn">
        <img src={logout} alt="log out" />
      </button>
    </nav>
  );
};

export default Header;
