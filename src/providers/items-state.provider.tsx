import React, { createContext, useLayoutEffect, useReducer } from "react";
import { stateReducer, State, Action } from "../state/items.reducer";
import useLocalStorage from "../hooks/local-storage.hook";
import { IItem } from "../@types";

interface IProps {
  children: React.ReactNode;
}

interface IItemStateContext {
  state: State;
  loading: boolean;
  dispatch: React.Dispatch<Action>;
}

const INTI_STATE = {
  state: { itemsList: [] },
  loading: true,
  dispatch: () => { },
};

export const ItemStateContext = createContext<IItemStateContext>(INTI_STATE);

const ItemsStateProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(stateReducer, { itemsList: [] });
  const { storedData, loading } = useLocalStorage(
    state.itemsList,
    "items-list"
  );

  useLayoutEffect(() => {
    if (!loading) {
      const itemsList: IItem[] = storedData || [];
      dispatch({ type: "INIT", payload: itemsList });
    }
  }, [loading, storedData]);

  return (
    <ItemStateContext.Provider value={{ state, loading, dispatch }}>
      {props.children}
    </ItemStateContext.Provider>
  );
};

export default ItemsStateProvider;
