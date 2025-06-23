import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { ITodo } from "../interfaces/todo.interface";
import { MatIcon } from "@angular/material/icon";
import { CreateTodoDialogComponent } from "./create-todo-dialog/create-todo-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from "@ngrx/store";
import { TodosActions } from "./store/todo.actions";
import { selectTodos } from "./store/todos.selectors";

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [ NgFor, TodoCardComponent, AsyncPipe, MatIcon ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
  readonly TodosApiService = inject(TodosApiService);
  readonly snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.TodosApiService.getTodos().subscribe(
      (response:ITodo[]) => {
        this.store.dispatch(TodosActions.set({ todos: response }));
        this.snackBar.open('Все Todo загружены', 'X', {
          duration: 2000
        })
      }
    )
  }

  public createTodo(todoData: ITodo): void {
    this.store.dispatch(TodosActions.create({
      todo: {
        id: new Date().getTime(),
        userId: todoData.userId,
        title: todoData.title,
        completed: todoData.completed
      }
    }));
    this.snackBar.open('Todo добавлен', 'X', {
      duration: 2000
    })
  }

  public editTodo(todo: ITodo): void {
    this.store.dispatch(TodosActions.edit({ todo }));
    this.snackBar.open('ToDo отредактирован', 'X', {
      duration: 2000
    })
  }

  public deleteTodo(id:number) {
    this.store.dispatch(TodosActions.delete({ id }));
    this.snackBar.open('ToDo удалён', 'X', {
      duration: 2000
    })
  }

  public openCreateTodoDialog(): void {
    this.dialog
      .open(CreateTodoDialogComponent)
      .afterClosed()
      .subscribe((newTodo: ITodo | undefined) => {
        if (newTodo) {
          this.createTodo(newTodo)
        }
      })
  }
}
