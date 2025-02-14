import { useContext } from "react";
import { IInvoice } from "../@types";
import { AuthContext } from "../providers/auth-provider";

export type State = {
  invoicesList: IInvoice[];
};
const { user } = useContext(AuthContext);
export type Action =
  | { type: "INIT"; payload: IInvoice[] }
  | { type: "GET_CLIENT_INVOICES" };

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        invoicesList: action.payload,
      };

    case "GET_CLIENT_INVOICES":
      return {
        ...state,
        invoicesList: user
          ? state.invoicesList.filter(
              (invoice) => invoice.invoiceToClient == user?.id
            )
          : state.invoicesList,
      };

    default:
      return state;
  }
};
