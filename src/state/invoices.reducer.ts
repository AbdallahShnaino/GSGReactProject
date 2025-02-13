import { IInvoice } from "../@types";

export type State = {
  invoicesList: IInvoice[];
};

export type Action =
  | { type: "INIT"; payload: IInvoice[] }
  | { type: "ADD_INVOICE"; payload: IInvoice }
  | { type: "ADD_INVOICES"; payload: IInvoice[] };

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        invoicesList: action.payload,
      };

    case "ADD_INVOICE":
      return {
        ...state,
        invoicesList: [action.payload, ...state.invoicesList],
      };
    case "ADD_INVOICES":
      return {
        ...state,
        invoicesList: action.payload,
      };

    default:
      return state;
  }
};
