import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ItemsStateProvider from "./providers/items-state.provider.tsx";
import InvoicesStateContext from "./providers/invoices-state.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <InvoicesStateContext>
    <ItemsStateProvider>
      <App />
    </ItemsStateProvider>
  </InvoicesStateContext>
);
