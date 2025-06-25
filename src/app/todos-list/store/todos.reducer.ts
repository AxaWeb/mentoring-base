import { createReducer, on } from "@ngrx/store";
import { ITodo } from "../../interfaces/todo.interface";
import { TodosActions } from "./todo.actions";
import { TodosState } from "../../interfaces/todo.interface";

const initialState: TodosState = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state: TodosState, payload: TodosState): TodosState => ({
    ...state,
    todos: payload.todos
  })),
  on(TodosActions.edit, (state: TodosState, payload: { todo: ITodo }): TodosState => ({
    ...state,
    todos: state.todos.map((todo: ITodo): ITodo => todo.id === payload.todo.id ? payload.todo :todo),
  })),
  on(TodosActions.create, (state: TodosState, payload: { todo: ITodo }): TodosState => ({
    ...state,
    todos: [payload.todo, ...state.todos],
  })),
  on(TodosActions.delete, (state: TodosState, payload: { id: number }): TodosState => ({
    ...state,
    todos: state.todos.filter((todo: ITodo): boolean => todo.id !== payload.id),
  }))
)
