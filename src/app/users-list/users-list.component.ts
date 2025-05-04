import {Component, inject} from "@angular/core";
import {NgFor} from "@angular/common";
import {UsersApiService} from "../users-api.service";
import {UserCardComponent} from "./user-card/user-card.component";

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
  imports: [NgFor, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})

export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  users:User[] = [];

  constructor() {
    this.UsersApiService.getUsers().subscribe(
      (response:any) => {
        this.users = response;
      }
    )
  }

  deleteUser(id:number){
    this.users =  this.users.filter(
      user => user.id !== id
    );
  }
}
