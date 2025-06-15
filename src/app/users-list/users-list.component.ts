import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatIcon],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  readonly UsersService = inject(UsersService);

  public dialog = inject(MatDialog);

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:IUser[]) => {
        this.UsersService.setUsers(response)
      }
    )
  }


  public createUser(formData: ICreateUser):void {
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


  public deleteUser(id: number): void {
    this.UsersService.deleteUser(id)
  }


  public editUser(user: ICreateUser): void {
    this.UsersService.editUser({
      ...user,
      company: {
        name: user.company.name
      }
    })
  }


  public openCreateUserDialog(): void {
    this.dialog
      .open(CreateUserDialogComponent, {
        data: {
          user: {
            name: null,
            email: null,
            website: null,
            company: {
              name: null
            }
          }
        }
      })
      .afterClosed()
      .subscribe((newUser: ICreateUser): void => {
        if (newUser) {
          this.createUser(newUser)
        }
      })
  }
}
