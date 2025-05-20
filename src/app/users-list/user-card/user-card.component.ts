import {Component, EventEmitter, Input, Output} from "@angular/core";
import {User} from "../users-list.component";

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

  public onDeleteUser(){
    this.deleteUser.emit()
  }
}
