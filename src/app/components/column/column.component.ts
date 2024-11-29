import { Component } from '@angular/core';

@Component({
  selector: 'column',
  template: `<div class="column"><ng-content></ng-content></div>`,
  styles: [
    `
      .column {
        display: flex;
        flex-direction: column;
        gap: 1rem; /* Adjust spacing between children */
        //make it centered
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ColumnComponent {}
