import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'mediumDatePipe',
  standalone: true
})

export class MediumDatePipe implements PipeTransform {
  private datePipe = new DatePipe('ru-RU');

  transform(value: Date | string | number): string | null {
    return this.datePipe.transform(value, 'mediumDate');
  }
}
