import { IInvoice } from "../@types";

export type State = {
  invoicesList: IInvoice[];
};

export type Action =
  | { type: "INIT"; payload: IInvoice[] }
  | { type: "ADD_INVOICE"; payload: IInvoice };

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
    default:
      return state;
  }
};
