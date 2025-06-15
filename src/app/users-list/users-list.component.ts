import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  readonly snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:IUser[]) => {
        this.UsersService.setUsers(response)
      }
    );
    this.snackBar.open('Все пользователи загружены', 'X', {
      duration: 2000
    })
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
    );
    this.snackBar.open('Пользователь добавлен', 'X', {
      duration: 2000
    })
  }


  public deleteUser(id: number): void {
    this.UsersService.deleteUser(id);
    this.snackBar.open('Пользователь удалён', 'X', {
      duration: 2000
    });
  }


  public editUser(user: ICreateUser): void {
    this.UsersService.editUser({
      ...user,
      company: {
        name: user.company.name
      }
    });
    this.snackBar.open('Пользователь отредактирован', 'X', {
      duration: 2000
    })
  }


  public openCreateUserDialog(): void {
    this.dialog
      .open(CreateUserDialogComponent)
      .afterClosed()
      .subscribe((newUser: ICreateUser): void => {
        if (newUser) {
          this.createUser(newUser)
        }
      })
  }
}
