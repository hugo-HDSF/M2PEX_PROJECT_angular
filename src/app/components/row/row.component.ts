import { Component } from '@angular/core';

@Component({
  selector: 'row',
  template: `<div class="row"><ng-content></ng-content></div>`,
  styles: [
    `
      .row {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center; /* Centers items vertically within the row */
        justify-content: flex-start;
      }
    `,
  ],
})
export class RowComponent {}
