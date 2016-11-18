import { Component, ElementRef } from '@angular/core';
import { SkillService } from '../../skill/skill.service'

@Component({
  selector: 'my-skill',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'skill.html',
  providers: [SkillService]
})

export class OnboardingSkillComponent {
  input = "";
  skills;
  suggestions = [];
  elementRef;
  errorMessage = "";

  constructor(myElement: ElementRef, private skillService: SkillService) {
    this.skillService.getSkills()
      .subscribe(
        skills => this.skills,
        error => this.errorMessage = <any>error
      );
    this.elementRef = myElement;
    console.log(this.skills);
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
    this.input = item;
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
