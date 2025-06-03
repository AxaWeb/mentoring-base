import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {User} from "../users-list.component";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss",
  standalone: true
})

export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser:EventEmitter<User[]> = new EventEmitter()

  @Output()
  editUser:EventEmitter<User> = new EventEmitter<User>()

  readonly dialog = inject(MatDialog);
  openDialog() {
    this.dialog
      .open(EditUserDialogComponent, {
        data: { user: this.user }
      })
      .afterClosed()
      .subscribe(editResult => {
        if(editResult) {
          this.editUser.emit(editResult)
        }
      });
  }

  public onDeleteUser(){
    this.deleteUser.emit()
  }
}
