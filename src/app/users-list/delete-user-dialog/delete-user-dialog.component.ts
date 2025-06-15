import { Component, inject } from '@angular/core';
import { IUser } from "../../interfaces/user.interface";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatDialogClose
  ],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})

export class DeleteUserDialogComponent {
  private readonly data: { user: IUser } = inject<{ user: IUser }>(MAT_DIALOG_DATA)

  public userName: string = this.data.user.name;

  get userGetId(): number {
    return this.data.user.id
  }
}
