import { LogOut, Info } from "lucide-react";
import "./ManualLogoutScreen.css";
import Logo from ".././../assets/WE_GROW.png";

const ManualLogoutScreen = () => {
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
            <button className="button button-logout">
              <LogOut size={20} />
              Logout
            </button>

            <button className="button button-info">
              <Info size={20} />
              Session Info
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManualLogoutScreen;
