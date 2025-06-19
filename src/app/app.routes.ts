import { Routes } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { TodosListComponent } from "./todos-list/todos-list.component";
import { adminGuard } from "./guards/admin.guard";
import { AdminComponent } from "./admin/admin.component"

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'todos', component: TodosListComponent },
  { path: '', component: MainPageComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] }
]
