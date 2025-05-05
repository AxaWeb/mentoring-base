import {Component, inject} from '@angular/core';
import {TodosApiService} from "../todos-api.service";
import {NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})

export class TodosListComponent {
  readonly TodosApiService = inject(TodosApiService);
  todos:Todos[] = [];

  constructor() {
    this.TodosApiService.getTodos().subscribe(
      (response:any) => {
        this.todos = response;
      }
    )
  }

  deleteTodo(id:number) {
    this.todos = this.todos.filter(
      todo => todo.id !== id
    )
  }
}
