import { Injectable } from "@angular/core";
import { ITodo } from "./interfaces/todo.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodosService {
  todoSubject$ = new BehaviorSubject<ITodo[]>([]);
  todos$ = this.todoSubject$.asObservable();

  public setTodo(todos: ITodo[]) {
    this.todoSubject$.next(todos)
  }

  public editTodo(editTodo: ITodo) {
    this.todoSubject$.next(
      this.todoSubject$.value.map(
        (todo: ITodo) => todo.id === editTodo.id ? editTodo : todo
      )
    )
  }

  public creatTodo(todos: ITodo) {
    const existingTodos = this.todoSubject$.value.find(
      (currentTodo: ITodo) => (currentTodo.title === todos.title) && (currentTodo.userId === todos.userId)
    )

    if (existingTodos) {
      alert('Такой ToDo уже есть!')
    } else {
      this.todoSubject$.next([todos, ...this.todoSubject$.value])
    }
  }

  public deleteTodo(id:number) {
    this.todoSubject$.next(
      this.todoSubject$.value.filter((todos: ITodo) => todos.id !== id)
    )
  }
}
