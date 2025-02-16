import { IUser } from "../@types";

export type State = {
  usersList: IUser[];
  currentUser: IUser | null;
};
export type Action =
  | { type: "INIT"; payload: IUser[] }
  | { type: "ADD_USER"; payload: IUser }
  | { type: "GET_USER_WITH_EMAIL"; payload: string };
export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        usersList: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        usersList: [action.payload, ...state.usersList],
      };

    case "GET_USER_WITH_EMAIL":
      const foundUser = state.usersList.find((user) => {
        console.log(user.email);
        console.log(action.payload);

        return user.email === action.payload;
      });
      console.log(foundUser, " foundUser");

      return {
        ...state,
        currentUser: foundUser || null,
      };
      return state;
  }
};
