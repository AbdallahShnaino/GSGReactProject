import { Route, Routes } from "react-router-dom";
import "./App.css";
import InvoiceListScreen from "./screens/invoiceList/InvoiceListScreen";
import { Role } from "./@types";
import ClientScreen from "./screens/client.screen";
import Guarded from "./components/common/guarded-route/guarded-route.component";
import NotFound from "./screens/not-found.screen";
import HomeScreen from "./screens/home.screen";
import ManualLogoutScreen from "./screens/manualLogout/ManualLogoutScreen";
import CreateAccount from "./screens/createAccount/create-account.screen";
import ProductPage from "./screens/ProductPage/ProductPage";
import CreateInvoiceScreen from "./screens/create-invoice/create-invoice";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/client"
          element={
            <Guarded roles={[Role.CLIENT]}>
              <ClientScreen />
            </Guarded>
          }
        />

        <Route path="/user/create" element={<CreateAccount />} />
        <Route
          path="/admin/invoice/create"
          element={
            <Guarded roles={[Role.ADMIN]}>
              <CreateInvoiceScreen />
            </Guarded>
          }
        />
        <Route
          path="/admin/invoice"
          element={
            <Guarded roles={[Role.ADMIN]}>
              <InvoiceListScreen />
            </Guarded>
          }
        />
        <Route
          path="/admin/product"
          element={
            <Guarded roles={[Role.ADMIN]}>
              <ProductPage />
            </Guarded>
          }
        />
        <Route path="/logout" element={<ManualLogoutScreen />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
