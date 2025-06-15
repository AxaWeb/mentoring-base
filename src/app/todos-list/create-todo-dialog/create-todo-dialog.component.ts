import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodo } from "../../interfaces/todo.interface";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogClose } from "@angular/material/dialog";

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatDialogClose
  ],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss'
})

export class CreateTodoDialogComponent {
  readonly data: { todo: ITodo } = inject<{ todo: ITodo }>(MAT_DIALOG_DATA);

  public todoForm = new FormGroup({
    userId: new FormControl(this.data?.todo.userId, [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl(this.data?.todo.title, [Validators.required,  Validators.minLength(3)]),
    completed: new FormControl(this.data?.todo.completed, [Validators.required]),
  })
}
