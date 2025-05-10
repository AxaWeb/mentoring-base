import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {UsersApiService} from "../users-api.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "../users.service";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  readonly UsersService = inject(UsersService);

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:User[]) => {
        this.UsersService.setUsers(response)
      }
    )
  }

  deleteUser(id:number){
    this.UsersService.deleteUser(id)
  }
}
