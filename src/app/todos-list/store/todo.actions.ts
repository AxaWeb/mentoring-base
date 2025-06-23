import { ITodo } from "../../interfaces/todo.interface";
import { props, createActionGroup } from "@ngrx/store"

export const TodosActions = createActionGroup({
  source: "Todo",
  events: {
    'set': props<{ todos: ITodo[] }>(),
    'edit': props<{ todo: ITodo }>(),
    'create': props<{ todo: ITodo }>(),
    'delete': props<{ id: number }>()
  }
})
