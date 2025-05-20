import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todos} from "../todos-list.component";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true
})

export class TodoCardComponent {
  @Input()
  todo!: Todos

  @Output()
  deleteTodo:EventEmitter<Todos[]> = new EventEmitter()

  onDeleteTodo() {
    this.deleteTodo.emit()
  }
}
