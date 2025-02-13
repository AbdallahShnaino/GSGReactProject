import React, { createContext, useLayoutEffect, useReducer } from "react";
import { stateReducer, State, Action } from "../state/invoices.reducer";
import useLocalStorage from "../hooks/local-storage.hook";
import { IInvoice } from "../@types";

interface IProps {
  children: React.ReactNode;
}

interface IInvoicesStateContext {
  state: State;
  loading: boolean;
  dispatch: React.Dispatch<Action>;
}

const INITIAL_STATE = {
  state: { invoicesList: [] },
  loading: true,
  dispatch: () => {},
};

export const InvoicesStateContext =
  createContext<IInvoicesStateContext>(INITIAL_STATE);

const InvoicesStateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(stateReducer, { invoicesList: [] });
  const { storedData, loading } = useLocalStorage(
    state.invoicesList,
    "invoice-list"
  );

  useLayoutEffect(() => {
    if (!loading) {
      const invoicesList: IInvoice[] = storedData || [];
      dispatch({ type: "INIT", payload: invoicesList });
    }
  }, [loading, storedData]);

  return (
    <InvoicesStateContext.Provider value={{ state, loading, dispatch }}>
      {children}
    </InvoicesStateContext.Provider>
  );
};

export default InvoicesStateProvider;
