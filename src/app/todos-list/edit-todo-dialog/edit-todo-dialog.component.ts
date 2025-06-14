import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { ITodo } from "../../interfaces/todo.interface";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    MatIcon,
    MatDialogClose
  ],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {
  readonly data: {todo: ITodo} = inject<{todo: ITodo}>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    userId: new FormControl(this.data.todo.userId, [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl(this.data.todo.title, [Validators.required,  Validators.minLength(3)]),
    completed: new FormControl(this.data.todo.completed, [Validators.required])
  })

  get todoFormWithId() {
    return {
      ...this.form.value,
      id: this.data.todo.id
    }
  }
}
