import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { ITodo } from "../interfaces/todo.interface";
import { MatIcon } from "@angular/material/icon";
import { CreateTodoDialogComponent } from "./create-todo-dialog/create-todo-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  readonly TodoService = inject(TodosService);
  readonly snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  constructor() {
    this.TodosApiService.getTodos().subscribe(
      (todos:ITodo[]) => {
        this.TodoService.setTodo(todos);
      }
    );
    this.snackBar.open('Все Todo загружены', 'X', {
      duration: 2000
    })
  }

  public createTodo(todoData: ITodo): void {
    this.TodoService.creatTodo(
      {
        id: new Date().getTime(),
        userId: todoData.userId,
        title: todoData.title,
        completed: todoData.completed
      }
    );
    this.snackBar.open('Todo добавлен', 'X', {
      duration: 2000
    })
  }

  public editTodo(todo: ITodo): void {
    this.TodoService.editTodo({ ...todo });
    this.snackBar.open('ToDo отредактирован', 'X', {
      duration: 2000
    })
  }

  public deleteTodo(id:number) {
    this.TodoService.deleteTodo(id);
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
