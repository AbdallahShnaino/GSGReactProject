import { IInvoice } from "../@types";

export type State = {
  invoicesList: IInvoice[];
};
export type Action =
  | { type: "INIT"; payload: IInvoice[] }
  | { type: "GET_CLIENT_INVOICES"; payload: string }
  | { type: "GET_ALL_INVOICES" };
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
        invoicesList: state.invoicesList.filter(
          (invoice) => invoice.invoiceToClient == action.payload
        ),
      };

    case "GET_ALL_INVOICES":
      return {
        ...state,
        invoicesList: state.invoicesList,
      };

    default:
      return state;
  }
};
