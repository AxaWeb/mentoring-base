import {inject, Injectable} from "@angular/core";
import { ITodo } from "./interfaces/todo.interface";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todoSubject$ = new BehaviorSubject<ITodo[]>([]);
  todos$ = this.todoSubject$.asObservable();

  readonly snackBar = inject(MatSnackBar);

  public setTodo(todos: ITodo[]) {
    this.todoSubject$.next(todos);
    this.snackBar.open('все ToDo загружены', 'X', {
      duration: 2000
    })
  }

  public editTodo(editTodo: ITodo) {
    this.todoSubject$.next(
      this.todoSubject$.value.map(
        (todo: ITodo) => todo.id === editTodo.id ? editTodo : todo
      )
    );
    this.snackBar.open('ToDo отредактирован', 'X', {
      duration: 2000
    })
  }

  public creatTodo(todos: ITodo) {
    const existingTodos = this.todoSubject$.value.find(
      (currentTodo: ITodo) => (currentTodo.title === todos.title) && (currentTodo.userId === todos.userId)
    )

    if (existingTodos) {
      this.snackBar.open('Такой ToDo уже есть!', 'X', {
        duration: 3000
      })
    } else {
      this.todoSubject$.next([todos, ...this.todoSubject$.value]);
      this.snackBar.open('ToDo добавлен', 'X', {
        duration: 2000
      })
    }
  }

  public deleteTodo(id:number) {
    this.todoSubject$.next(
      this.todoSubject$.value.filter((todos: ITodo) => todos.id !== id)
    );
    this.snackBar.open('ToDo удалён', 'X', {
      duration: 2000
    });
  }
}
