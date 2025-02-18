import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ItemsStateProvider from "./providers/items-state.provider.tsx";
import InvoicesStateContext from "./providers/invoices-state.provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider.tsx";
import UsersStateProvider from "./providers/users-state.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <InvoicesStateContext>
    <ItemsStateProvider>
      <UsersStateProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </UsersStateProvider>
    </ItemsStateProvider>
  </InvoicesStateContext>
);
