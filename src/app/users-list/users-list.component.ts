import { HttpClient } from '@angular/common/http';
import {Component, inject} from "@angular/core";
import {NgFor} from "@angular/common";

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
  imports: [NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})

export class UsersListComponent {
  readonly usersListApi = inject(HttpClient);
  users:User[] = [];

  constructor() {
    this.usersListApi.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(
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
