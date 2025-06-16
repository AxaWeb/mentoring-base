import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'limit20SimbolsPipe',
  standalone: true
})

export class Limit20SimbolsPipe implements PipeTransform {
  transform(text: string, limit: number = 20): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
