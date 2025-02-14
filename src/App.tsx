import { Route, Routes } from "react-router-dom";
import "./App.css";
import InvoiceListScreen from "./screens/invoiceList/InvoiceListScreen";
import { Role } from "./@types";
import ClientScreen from "./screens/client.screen";
import Guarded from "./components/common/guarded-route/guarded-route.component";
import NotFound from "./screens/not-found.screen";
import HomeScreen from "./screens/home.screen";
import ManualLogoutScreen from "./screens/manualLogout/ManualLogoutScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/logout" element={<ManualLogoutScreen />} />
        <Route path="/admin" element={<InvoiceListScreen />} />
        <Route
          path="/client"
          element={
            <Guarded roles={[Role.CLIENT]}>
              <ClientScreen />
            </Guarded>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
