import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { ICreateTodo, ITodo } from "../../interfaces/todo.interface";
import { MatDialog } from "@angular/material/dialog";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";
import { DeleteTodoDialogComponent } from "../delete-todo-dialog/delete-todo-dialog.component";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true
})

export class TodoCardComponent {
  @Input()
  todo!: ITodo

  @Output()
  deleteTodo:EventEmitter<ITodo> = new EventEmitter<ITodo>()

  @Output()
  editTodo:EventEmitter<ICreateTodo> = new EventEmitter<ICreateTodo>()

  readonly dialog = inject(MatDialog);

  public openDialog(): void {
    this.dialog
      .open(EditTodoDialogComponent, {
        data: { todo: this.todo }
      })
      .afterClosed()
      .subscribe((editResult: ICreateTodo | undefined) => {
        if (editResult) {
          this.editTodo.emit(editResult)
        }
      });
  }

  public openDeleteTodoDialog(): void {
    this.dialog
      .open(DeleteTodoDialogComponent, {
        data: { todo: this.todo }
      })
      .afterClosed()
      .subscribe((toDeleteTodo: ITodo | undefined) => {
        if (toDeleteTodo) {
          this.deleteTodo.emit(toDeleteTodo)
        }
      });
  }
}
