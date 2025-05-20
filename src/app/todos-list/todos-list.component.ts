import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TodosApiService} from "../todos-api.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {TodosService} from "../todos.service";
import {CreateTodoFormComponent} from "../create-todo-form/create-todo-form.component";

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
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

  public createTodo(todoData: Todos): void {
    this.TodoService.creatTodo(
      {
        id: new Date().getTime(),
        userId: todoData.userId,
        title: todoData.title,
        completed: todoData.completed
      }
    )
  }

  public deleteTodo(id:number) {
    this.TodoService.deleteTodo(id);
  }
}
