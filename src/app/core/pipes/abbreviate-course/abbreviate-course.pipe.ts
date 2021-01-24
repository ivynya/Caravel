import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateCourse'
})
export class AbbreviateCoursePipe implements PipeTransform {

  transform(courseName: string): string {
    // Remove "AP" prefix from name if exists
    if (courseName.startsWith("AP "))
      courseName = courseName.substring(3);

    // Return first two characters in name
    return courseName.substr(0, 2);
  }

}
