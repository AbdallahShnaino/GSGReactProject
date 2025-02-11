import { IItem } from "../@types";

export type State = {
  itemsList: IItem[];
};

export type Action =
  | { type: "INIT"; payload: IItem[] }
  | { type: "ADD_ITEM"; payload: IItem }
  | { type: "UPDATE_ITEM"; payload: IItem }
  | { type: "DELETE_ITEM"; payload: number };

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return { ...state, itemsList: action.payload };

    case "ADD_ITEM":
      return { ...state, itemsList: [action.payload, ...state.itemsList] };

    case "UPDATE_ITEM":
      return {
        ...state,
        itemsList: state.itemsList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "DELETE_ITEM":
      return {
        ...state,
        itemsList: state.itemsList.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
