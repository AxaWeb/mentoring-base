import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import {  MatDialogClose } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ICreateUser } from "../../interfaces/user.interface";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})

export class CreateUserDialogComponent {
  readonly data: { user: ICreateUser } = inject<{ user: ICreateUser }>(MAT_DIALOG_DATA)

  public form = new FormGroup({
    name: new FormControl(this.data?.user?.name, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data?.user?.email, [Validators.required, Validators.email]),
    website: new FormControl(this.data?.user?.website, [Validators.required, Validators.minLength(4)]),
    company: new FormGroup({
      name: new FormControl(this.data?.user?.company?.name, [Validators.required, Validators.minLength(2)])
    })
  })
}
