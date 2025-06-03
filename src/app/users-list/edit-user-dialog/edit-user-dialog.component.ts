import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {User} from "../users-list.component";

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
  readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
    website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(4)]),
    companyName: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(2)]),
  })

  get userFormWithId() {
    return {
      ...this.form.value,
      id: this.data.user.id
    }
  }
}
