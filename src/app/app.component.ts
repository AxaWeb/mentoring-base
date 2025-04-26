import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';


const myCompanyFunc = (i:string) => i;
const myCompany:string = 'О компании';
const FincInit = myCompanyFunc(myCompany);

const newPages:Array<number> = [5, 4, 3, 2, 1]

const toUpperCase = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'mentoring-base';

  readonly headerTop1Item1 = "Главная";
  readonly headerTop1Item2 = "О компании";
  readonly headerTop1Item3 = "Каталог";
  isheaderTop1Item3 = true;

  readonly aboutCompany = myCompany;

  isManHidden:boolean = true;

  readonly newPages = newPages;

  toUpperCase:Array<string> = toUpperCase;
  isUpperCase:boolean = true;
  changeMenuText() {
    this.toUpperCase = toUpperCase.map(
      item => this.isUpperCase ? item.toUpperCase() : item.toLowerCase()
    )
    this.isUpperCase = !this.isUpperCase;
  }
}
