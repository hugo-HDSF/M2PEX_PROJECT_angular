import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDTO } from './product.model';

import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { ChemicalService } from '../chemical/chemical.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private chemicalService: ChemicalService,
  ) {}

  fetchProducts(): void {
    this.http
      .get<ProductDTO[]>(this.baseUrl)
      .pipe(
        switchMap((products) => {
          const productsWithChemicals$ = products.map((product) => {
            const chemicalIds = product.chemicals;
            const chemicalObservables = chemicalIds.map((id) =>
              this.chemicalService.getChemicalById(id),
            );

            return forkJoin(chemicalObservables).pipe(
              map((chemicals) => ({
                ...product,
                chemicals: chemicals,
              })),
            );
          });

          return forkJoin(productsWithChemicals$);
        }),
      )
      .subscribe(
        (products) => {
          this.productsSubject.next(products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        },
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<ProductDTO[]>(`${this.baseUrl}/?id=${id}`).pipe(
      map((product) => product[0]),
      switchMap((product) => {
        console.log('product:', product);
        const chemicalIds = product.chemicals;
        console.log('chemicalIds:', chemicalIds);
        const chemicalObservables = chemicalIds.map((id) =>
          this.chemicalService.getChemicalById(id),
        );

        return forkJoin(chemicalObservables).pipe(
          map((chemicals) => ({
            ...product,
            chemicals: chemicals,
          })),
        );
      }),
    );
  }

  addProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      tap((newProduct) => {
        this.productsSubject.next([...this.productsSubject.value, newProduct]);
      }),
    );
  }

  deleteProduct(product: Product): void {
    this.http.delete(`${this.baseUrl}/${product.id}`).subscribe(
      () => {
        this.productsSubject.next(
          this.productsSubject.value.filter((p) => p.id !== product.id),
        );
      },
      (error) => {
        console.error('Error deleting product:', error);
      },
    );
  }
}
