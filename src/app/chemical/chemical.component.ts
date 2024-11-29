import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chemical } from './chemical.model';
import { ChemicalService } from './chemical.service';

@Component({
  selector: 'app-chemical',
  templateUrl: './chemical.component.html',
  styleUrls: ['./chemical.component.scss'],
})
export class ChemicalComponent {
  @Input() chemical!: Chemical;
  @Output() chemicalClicked = new EventEmitter<Chemical>();

  constructor(private chemicalService: ChemicalService) {}

  getSeverityStyle(severity: string, type: 'toast' | 'chip'): string {
    return this.chemicalService.getSeverityStyle(severity, type);
  }
}
