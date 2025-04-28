import {Component} from "@angular/core";
import {NgFor, NgIf} from "@angular/common";

const newPages:Array<number> = [5, 4, 3, 2, 1]

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})


export class MainPageComponent {
  isManHidden:boolean = true;

  readonly newPages = newPages;
}
