import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChemicalService } from '../chemical.service';

@Component({
  selector: 'app-add-chemical',
  templateUrl: './add-chemical.component.html',
  styleUrls: ['./add-chemical.component.scss'],
})
export class AddChemicalComponent implements OnInit {
  chemicalForm!: FormGroup;
  severityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private chemicalService: ChemicalService,
  ) {}

  ngOnInit(): void {
    this.chemicalForm = this.fb.group({
      name: ['', Validators.required],
      severity: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.chemicalForm.valid) {
      const newChemical = this.chemicalForm.value;
      // Save the chemical via service
      this.chemicalService.addChemical(newChemical).subscribe(
        (chemical) => {
          this.ref.close(chemical);
        },
        (error) => {
          console.error('Error adding chemical:', error);
        },
      );
    }
  }

  onCancel() {
    this.ref.close();
  }
}
