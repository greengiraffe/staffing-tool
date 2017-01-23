import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'pastProjects'
})

export class PastProjectsPipe implements PipeTransform {

     transform(date) {
         if(!date) return;

         let today = new Date();
         if(new Date(date) < today)
             return "past";
     }
}
