import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Chemical } from '../chemical/chemical.model';
import { ChemicalService } from '../chemical/chemical.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddProductComponent } from './add-product/add-product.component';
import { AddChemicalComponent } from '../chemical/add-chemical/add-chemical.component';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  chemicals: Chemical[] = [];
  filteredChemicals: Chemical[] = [];

  constructor(
    private productService: ProductService,
    private chemicalService: ChemicalService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });

    this.chemicalService.chemicals$.subscribe((products) => {
      this.chemicals = products;
      this.filteredChemicals = [...this.chemicals];
    });

    this.productService.fetchProducts();
    this.chemicalService.fetchChemicals();
  }

  openAddProductDialog() {
    const ref = this.dialogService.open(AddProductComponent, {
      header: 'Add Product',
      closable: true,
    });

    ref.onClose.subscribe((product) => {
      if (product) {
        this.productService.fetchProducts();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Product added',
        });
      }
    });
  }

  openAddChemicalDialog() {
    const ref = this.dialogService.open(AddChemicalComponent, {
      header: 'Add Chemical',
      closable: true,
    });

    ref.onClose.subscribe((chemical) => {
      if (chemical) {
        this.chemicalService.fetchChemicals();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Chemical added',
        });
      }
    });
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.deleteProduct(product);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Product deleted',
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Product deletion rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'Product deletion cancelled',
            });
            break;
        }
      },
    });
  }

  onChemicalClicked(chemical: Chemical) {
    console.log('Chemical severity:', chemical.severity);
    this.messageService.add({
      severity: this.chemicalService.getSeverityStyle(
        chemical.severity,
        'toast',
      ),
      summary: 'Chemical Selected',
      detail: `${chemical.name} has a ${chemical.severity} risk level`,
    });
  }
}
