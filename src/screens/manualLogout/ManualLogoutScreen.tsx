import { LogOut } from "lucide-react";
import Logo from ".././../assets/WE_GROW.png";
import "./ManualLogoutScreen.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth-provider";

const ManualLogoutScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <main className="container">
        <header className="logo">
          <img src={Logo} draggable="false" alt="We Grow" />
        </header>
        <div className="card">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">
            You are logged in. Manage your session below.
          </p>

          <div className="button-group">
            <button className="button button-logout" onClick={logout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManualLogoutScreen;
