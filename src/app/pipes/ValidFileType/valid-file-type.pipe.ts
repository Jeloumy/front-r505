import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validFileType'
})
export class ValidFileTypePipe implements PipeTransform {

  transform(file: File): boolean {
    if (!file) return false;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    return validTypes.includes(file.type);
  }
}
