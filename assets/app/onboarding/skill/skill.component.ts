import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'my-skill',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'skill.html'
})

export class SkillComponent {
  input = "";
  skills: string[] = [
    'AngularJS',
    'CSS',
    'HTML5',
    'JavaScript',
    'TypeScript',
    'SASS',
    'Java',
    'Ruby',
    'Python',
    'Git',
    'React'
  ];
  suggestions = [];
  elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  onInput() {
    if(this.input !== "") {
      this.suggestions = this.skills.filter(this.checkIsSkill.bind(this, this.input));
    } else {
      this.suggestions = [];
    }
  }

  checkIsSkill(input,element) {
    return element.toLowerCase().includes(input.toLowerCase());
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
