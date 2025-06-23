import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserCardShadowDirective } from "../directives/user-card-shadow.directive";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ NgFor, UserCardComponent, AsyncPipe, MatIcon, UserCardShadowDirective ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  readonly snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:IUser[]) => {
        this.store.dispatch(UsersActions.set({ users: response }));
        this.snackBar.open('Все пользователи загружены', 'X', {
          duration: 2000
        });
      }
    )
  }

  public createUser(formData: ICreateUser):void {
    this.store.dispatch(UsersActions.create({
      user: {
        id: new Date().getTime(),
        name: formData.name,
        email: formData.email,
        website: formData.website,
        company: {
          name: formData.company.name,
        }
      }
    }));
    this.snackBar.open('Пользователь добавлен', 'X', {
      duration: 2000
    });
  }

  public deleteUser(id: number): void {
    this.store.dispatch(UsersActions.delete({ id }));
    this.snackBar.open('Пользователь удалён', 'X', {
      duration: 2000
    });
  }

  public editUser(user: ICreateUser): void {
    this.store.dispatch(UsersActions.edit({ user }));
    this.snackBar.open('Пользователь отредактирован', 'X', {
      duration: 2000
    });
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
