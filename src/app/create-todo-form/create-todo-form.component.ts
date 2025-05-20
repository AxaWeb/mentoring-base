import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
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
  }
}
