import { Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {MainPageComponent} from "./main-page/main-page.component";

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: '', component: MainPageComponent}
];
