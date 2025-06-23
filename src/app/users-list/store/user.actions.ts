import { IUser } from "../../interfaces/user.interface";
import { props, createActionGroup } from "@ngrx/store"

export const UsersActions = createActionGroup({
  source: "User",
  events: {
    'set': props<{ users: IUser[] }>(),
    'edit': props<{ user: IUser }>(),
    'create': props<{ user: IUser }>(),
    'delete': props<{ id: number }>()
  }
})
