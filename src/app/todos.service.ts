import {Injectable} from "@angular/core";
import {Todos} from "./todos-list/todos-list.component";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodosService {
  todoSubject$ = new BehaviorSubject<Todos[]>([]);
  todos$ = this.todoSubject$.asObservable();

  public setTodo(todos:Todos[]) {
    this.todoSubject$.next(todos);
  }

  public editTodo(editTodo:Todos) {
    this.todoSubject$.next(
      this.todoSubject$.value.map(
        (todo: Todos) => todo.id === editTodo.id ? editTodo : todo
      )
    )
  }

  public creatTodo(todos:Todos) {
    const existingTodos = this.todoSubject$.value.find(
      (currentTodo:Todos) => (currentTodo.title === todos.title) && (currentTodo.userId === todos.userId)
    )

    if (existingTodos) {
      alert(`Такой ToDo уже есть!`);
    } else {
      this.todoSubject$.next([todos, ...this.todoSubject$.value])
      alert(`ToDo добавлен`);
    }
  }

  public deleteTodo(id:number) {
    this.todoSubject$.next(
      this.todoSubject$.value.filter((todos: Todos) => todos.id !== id)
    )
  }
}
