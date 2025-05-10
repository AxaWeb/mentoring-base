import {Injectable} from "@angular/core";
import {Todos} from "./todos-list/todos-list.component";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodosService {
  todoSubject$ = new BehaviorSubject<Todos[]>([]);

  setTodo(todos:Todos[]) {
    this.todoSubject$.next(todos);
  }

  editTodo(editTodo:Todos) {
    this.todoSubject$.next(
      this.todoSubject$.value.map(
        todo => todo.id === editTodo.id ? editTodo : todo
      )
    )
  }

  creatTodo(todos:Todos) {
    this.todoSubject$.next([...this.todoSubject$.value, todos])
  }

  deleteTodo(id:number) {
    this.todoSubject$.next(
      this.todoSubject$.value.filter(todos => todos.id !== id)
    )
  }
}
