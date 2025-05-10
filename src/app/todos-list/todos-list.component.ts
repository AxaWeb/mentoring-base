import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TodosApiService} from "../todos-api.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {TodosService} from "../todos.service";

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
  readonly TodosApiService = inject(TodosApiService);
  readonly TodoService = inject(TodosService);

  constructor() {
    this.TodosApiService.getTodos().subscribe(
      (todos:Todos[]) => {
        this.TodoService.setTodo(todos);
      }
    )
  }

  deleteTodo(id:number) {
    this.TodoService.deleteTodo(id);
  }
}
