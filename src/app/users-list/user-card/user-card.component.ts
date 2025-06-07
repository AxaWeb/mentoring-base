import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { iEditUser, iUser } from "../../interfaces/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss",
  standalone: true
})

export class UserCardComponent {
  @Input()
  user!: iUser;

  @Output()
  deleteUser: EventEmitter<iUser[]> = new EventEmitter<iUser[]>()

  @Output()
  editUser: EventEmitter<iEditUser> = new EventEmitter<iEditUser>()

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user }
      })
      .afterClosed()
      .subscribe((editResult: iEditUser | undefined) => {
        if (editResult) {
          this.editUser.emit(editResult);
        }
      });
  }

  public onDeleteUser(){
    this.deleteUser.emit()
  }
}
