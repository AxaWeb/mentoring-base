import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ITodo } from "./interfaces/todo.interface";

@Injectable({
  providedIn: 'root'
})

export class TodosApiService {
  readonly todosApiService = inject(HttpClient);

  public getTodos() {
    return this.todosApiService.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
  }
}
