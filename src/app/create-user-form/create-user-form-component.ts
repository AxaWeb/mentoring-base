import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.html',
  styleUrl: './create-user-form.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatFormFieldModule, MatIcon, MatButton]
})
export class CreateUserFormComponent {
  @Output()
  createUser = new EventEmitter()

  public form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    website: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    companyName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
  })

  public submitForm():void {
    this.createUser.emit(this.form.value)
    this.form.reset()
  }
}
