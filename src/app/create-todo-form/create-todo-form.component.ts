import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter();

  public todoForm = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    title: new FormControl('', [Validators.required,  Validators.minLength(3)]),
    completed: new FormControl('', [Validators.required]),
  })

  public submitTodoForm():void {
    this.createTodo.emit({...this.todoForm.value, completed: this.todoForm.get('completed')?.value === 'true' });
    this.todoForm.reset({
      userId: this.todoForm.value.userId,
      title: null,
      completed: this.todoForm.value.completed
    })
  }
}
