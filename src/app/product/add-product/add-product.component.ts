import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chemical } from '../../chemical/chemical.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChemicalService } from '../../chemical/chemical.service';
import { ProductService } from '../product.service';
import {
  MultiSelectChangeEvent,
  MultiSelectSelectAllChangeEvent,
} from 'primeng/multiselect';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  chemicals: Chemical[] = [];
  filteredChemicals: Chemical[] = [];

  selectedItems!: any[];
  selectAll = false;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private chemicalService: ChemicalService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      chemicals: [[], Validators.required],
    });

    this.chemicalService.chemicals$.subscribe((products) => {
      this.chemicals = products;
      this.filteredChemicals = [];
    });

    this.productService.fetchProducts();
  }

  loadChemicals(): void {
    this.chemicalService.chemicals$.subscribe(
      (chemicals) => {
        this.chemicals = chemicals;
      },
      (error) => {
        console.error('Error fetching chemicals:', error);
      },
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const newProduct = {
        ...formValue,
        chemicals: formValue.chemicals.map((chemical: Chemical) => chemical.id),
      };
      this.productService.addProduct(newProduct).subscribe(
        (product) => {
          this.ref.close(product);
        },
        (error) => {
          console.error('Error adding product:', error);
        },
      );
    }
  }

  onCancel() {
    this.ref.close();
  }

  onSelectAllChange(event: MultiSelectSelectAllChangeEvent) {
    this.selectedItems = event.checked ? [...this.filteredChemicals] : [];
    this.selectAll = event.checked;
  }

  onChange(event: MultiSelectChangeEvent) {
    const { originalEvent, value } = event;
    if (value) this.selectAll = value.length === this.filteredChemicals.length;
  }
}
