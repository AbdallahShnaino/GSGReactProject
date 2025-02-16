import React, { createContext, useLayoutEffect, useReducer } from "react";
import { stateReducer, State, Action } from "../state/users.reducer";
import useLocalStorage from "../hooks/local-storage.hook";
import { IInvoice, IUser } from "../@types";

interface IProps {
  children: React.ReactNode;
}

interface IUsersStateContext {
  state: State;
  loading: boolean;
  dispatch: React.Dispatch<Action>;
}

const INITIAL_STATE = {
  state: { usersList: [], currentUser: null },
  loading: true,
  dispatch: () => {},
};

export const UsersStateContext =
  createContext<IUsersStateContext>(INITIAL_STATE);

const UsersStateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(stateReducer, {
    usersList: [],
    currentUser: null,
  });
  const { storedData, loading } = useLocalStorage(
    state.usersList,
    "users-list"
  );

  useLayoutEffect(() => {
    if (!loading) {
      const usersList: IUser[] = storedData || [];
      dispatch({ type: "INIT", payload: usersList });
    }
  }, [loading, storedData]);

  return (
    <UsersStateContext.Provider value={{ state, loading, dispatch }}>
      {children}
    </UsersStateContext.Provider>
  );
};

export default UsersStateProvider;
