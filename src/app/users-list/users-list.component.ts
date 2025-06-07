import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form-component";
import { iCreateUser, iEditUser, iUser } from "../interfaces/user.interface";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  readonly UsersService = inject(UsersService);

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:iUser[]) => {
        this.UsersService.setUsers(response)
      }
    )
  }

  public createUser(formData: iCreateUser):void {
    this.UsersService.createUser(
      {
        id: new Date().getTime(),
        name: formData.name,
        email: formData.email,
        website: formData.website,
        company: {
          name: formData.company.name,
        }
      }
    )
  }

  public deleteUser(id:number){
    this.UsersService.deleteUser(id)
  }

  public editUser(user:iEditUser) {
    this.UsersService.editUser({
      ...user,
      company: {
        name: user.company.name
      }
    })
  }
}
