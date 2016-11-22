import { Component, ElementRef } from '@angular/core';
import { SkillService } from "../../_services/skill.service";

@Component({
  selector: 'app-skill-suggestions',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'skill-suggestions.template.html',
  providers: [SkillService]
})

export class SkillSuggestionsComponent {
  input = "";
  skills;
  suggestions = [];
  elementRef;
  errorMessage = "";

  constructor(myElement: ElementRef, private skillService: SkillService) {
    this.skillService.getSkills()
      .subscribe(
        skills => this.skills = <any>skills,
        error => this.errorMessage = <any>error
      );
    this.elementRef = myElement;
  }

  onInput() {
    if(this.input !== "" && this.skills) {
      this.suggestions = this.skills.filter(this.checkIsSkill.bind(this, this.input));
    } else {
      this.suggestions = [];
    }
  }

  checkIsSkill(input,element) {
    return element.name.toLowerCase().includes(input.toLowerCase());
  }

  select(item) {
    this.input = item.name;
    this.suggestions = [];
  }

  handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.suggestions = [];
    }
}
}
