import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { ICreateTodo, ITodo } from "../interfaces/todo.interface";
import { MatIcon } from "@angular/material/icon";
import { CreateTodoDialogComponent } from "./create-todo-dialog/create-todo-dialog.component";
import { MatDialog } from "@angular/material/dialog";

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

  readonly dialog = inject(MatDialog);

  constructor() {
    this.TodosApiService.getTodos().subscribe(
      (todos:ITodo[]) => {
        this.TodoService.setTodo(todos);
      }
    )
  }

  public createTodo(todoData: ITodo): void {
    this.TodoService.creatTodo(
      {
        id: new Date().getTime(),
        userId: todoData.userId,
        title: todoData.title,
        completed: todoData.completed
      }
    )
  }

  public editTodo(todo: ITodo): void {
    this.TodoService.editTodo(
      {
        ...todo
      }
    )
  }

  public deleteTodo(id:number) {
    this.TodoService.deleteTodo(id);
  }


  public openCreateTodoDialog(): void {
    this.dialog
      .open(CreateTodoDialogComponent, {
        data: {
          todo: {
            userId: null,
            title: null,
            completed: null
          }
        }
      })
      .afterClosed()
      .subscribe((newTodo: ICreateTodo | undefined) => {
        if (newTodo) {
          this.createTodo(newTodo)
        }
      });
  }
}
