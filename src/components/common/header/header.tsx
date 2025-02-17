import "./header.css";
import logo from "./../../../assets/WE_GROW.png";
import logoutIcon from "./../../../assets/log-out.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth-provider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="header">
      <ul className="header__nav">
        <li className="header__nav-item">
          <img className="header__logo" src={logo} alt="logo" />
        </li>
        <li className="header__logout-text" onClick={onLogoutClick}>
          Logout
        </li>
      </ul>
      <button className="header__logout-btn" onClick={onLogoutClick}>
        <img src={logoutIcon} alt="log out" />
      </button>
    </nav>
  );
};

export default Header;
