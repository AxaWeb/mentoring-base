import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../interfaces/user.interface";
import { UsersActions } from "./user.actions";
import { UsersState } from "../../interfaces/user.interface"

const initialState: UsersState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state: UsersState, payload: UsersState): UsersState => ({
    ...state,
    users: payload.users
  })),
  on(UsersActions.edit, (state: UsersState, payload): UsersState => ({
    ...state,
    users: state.users.map((user: IUser): IUser => user.id === payload.user.id ? payload.user : user),
  })),
  on(UsersActions.create, (state: UsersState, payload): UsersState => ({
    ...state,
    users: [payload.user, ...state.users],
  })),
  on(UsersActions.delete, (state: UsersState, payload): UsersState => ({
    ...state,
    users: state.users.filter((user: IUser): boolean => user.id !== payload.id),
  }))
)
