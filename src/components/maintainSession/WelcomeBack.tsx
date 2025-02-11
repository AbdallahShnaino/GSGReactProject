import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, Info } from "lucide-react";
import weGrow from "../../assets.WE_GROW.png";

export default function WelcomeBack() {
  const { user, logout, getSessionInfo } = useAuth();
  const [showSessionInfo, setShowSessionInfo] = useState(false);

  const sessionInfo = getSessionInfo();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <div>
        <img src={weGrow} alt="WE GROW" draggable="false" />
      </div>
      <div className="container">
        <div className="card">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">
            You are logged in as {user?.email}. Manage your session below.
          </p>

          <div className="button-group">
            <button onClick={logout} className="button button-logout">
              <LogOut size={20} />
              Logout
            </button>

            <button
              onClick={() => setShowSessionInfo(!showSessionInfo)}
              className="button button-info"
            >
              <Info size={20} />
              Session Info
            </button>
          </div>

          {showSessionInfo && sessionInfo && (
            <div className="session-info">
              <h2 className="session-info-title">Session Details</h2>
              <div className="session-info-details">
                <p>Login Time: {formatDate(sessionInfo.loginTime)}</p>
                <p>Expires At: {formatDate(sessionInfo.expiresAt)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
