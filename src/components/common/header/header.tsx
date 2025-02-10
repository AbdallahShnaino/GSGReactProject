import "./header.css";
import logo from "./../../../assets/WE_GROW.png";
import logout from "./../../../assets/log-out.png";
const Header = () => {
  return (
    <nav className="client-nav">
      <ul>
        <li>
          <img id="logo" src={logo} alt="logo" />
        </li>
        <li>Logout</li>
      </ul>
      <button id="logout-btn">
        <img src={logout} alt="log out" />
      </button>
    </nav>
  );
};

export default Header;
