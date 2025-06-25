import { Component, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CartColorDirective } from "../directives/cart-color.directive";
import { AuthService } from '../auth.service';

const myCompanyFunc = (i:string) => i;
const myCompany:string = 'О компании';
const FincInit = myCompanyFunc(myCompany);

const toUpperCase = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink, DatePipe, CartColorDirective ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  readonly headerTop1Item1 = "Главная";
  readonly headerTop1Item3 = "Каталог";
  isheaderTop1Item3 = true;

  readonly aboutCompany = FincInit;

  toUpperCase:Array<string> = toUpperCase;
  isUpperCase:boolean = true;
  public changeMenuText() {
    this.toUpperCase = toUpperCase.map(
      item => this.isUpperCase ? item.toUpperCase() : item.toLowerCase()
    )
    this.isUpperCase = !this.isUpperCase;
  }

  today: Date = new Date();

  public readonly auth = inject(AuthService)

  loginAsAdmin() {
    this.auth.loginAsAdmin();
  }

  loginAsUser() {
    this.auth.loginAsUser();
  }

  logout() {
    this.auth.logout();
  }
}
