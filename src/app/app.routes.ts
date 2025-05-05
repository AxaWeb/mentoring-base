import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {TodosListComponent} from "./todos-list/todos-list.component";

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'todos', component: TodosListComponent },
  { path: '', component: MainPageComponent}
];
