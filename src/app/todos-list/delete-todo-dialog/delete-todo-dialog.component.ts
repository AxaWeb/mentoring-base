import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ITodo } from "../../interfaces/todo.interface";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatDialogClose
  ],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss'
})

export class DeleteTodoDialogComponent {
  private readonly data: { todo: ITodo } = inject<{ todo: ITodo }>(MAT_DIALOG_DATA);

  get todoGetId(): number {
    return this.data.todo.id
  }
}
