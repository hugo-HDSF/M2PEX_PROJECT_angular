import { Component, Input } from '@angular/core';

@Component({
  selector: 'space',
  template: `<div class="space" [style.height]="height"></div>`,
  styles: [
    `
      .space {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class SpaceComponent {
  @Input() height: string = '1rem'; // Default height set to 1rem
}
