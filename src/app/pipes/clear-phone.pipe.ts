import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'clearPhonePipe',
  standalone: true
})

export class ClearPhonePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.replace(/-/g, '');
  }
}
