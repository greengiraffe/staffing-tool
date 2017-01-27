import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-match-bar',
    template: `
      <span class="description" *ngIf="showDescription">Match</span>
      <div class="meter">
        <div class="bar" [style.opacity]="getOpacity(value)" [style.width]="getPercentString(value)"></div>
      </div>
    `,
    styleUrls: ['match-bar.style.scss']
})

export class MatchBarComponent {
    @Input() value: number;
    @Input() showDescription = false;

    constructor() {}

    getPercentString(value: number): string {
        return Math.round((value * 100)) + "%"
    }

    getOpacity(value: number): number {
        if (value <= 0.25) return 0.3;
        if (value <= 0.5) return 0.7;
        else return 1;
    }

}
