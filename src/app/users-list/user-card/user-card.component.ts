import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ICreateUser, IUser } from "../../interfaces/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss",
  standalone: true
})

export class UserCardComponent {
  @Input()
  user!: IUser;

  @Output()
  deleteUser: EventEmitter<IUser[]> = new EventEmitter<IUser[]>()

  @Output()
  editUser: EventEmitter<ICreateUser> = new EventEmitter<ICreateUser>()

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user }
      })
      .afterClosed()
      .subscribe((editResult: ICreateUser | undefined) => {
        if (editResult) {
          this.editUser.emit(editResult);
        }
      });
  }

  public onDeleteUser(){
    this.dialog
      .open(DeleteUserDialogComponent, {
        data: { user: this.user }
      })
      .afterClosed()
      .subscribe((deleteUser: IUser | undefined) => {
        if (deleteUser) {
          this.deleteUser.emit()
        }
      })
  }
}
