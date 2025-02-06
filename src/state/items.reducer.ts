import { IItem } from "../@types";

export type State = {
  itemsList: IItem[];
};

export type Action = { type: "ADD_ITEM"; payload: IItem };

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        itemsList: [action.payload, ...state.itemsList],
      };
    default:
      return state;
  }
};
