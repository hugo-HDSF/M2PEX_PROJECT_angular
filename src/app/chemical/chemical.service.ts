import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chemical } from './chemical.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChemicalService {
  private baseUrl = 'http://localhost:3000/chemicals';

  private chemicalsSubject: BehaviorSubject<Chemical[]> = new BehaviorSubject<
    Chemical[]
  >([]);

  public chemicals$: Observable<Chemical[]> =
    this.chemicalsSubject.asObservable();

  constructor(private http: HttpClient) {}

  severityChipMapping: { [key: string]: string } = {
    low: 'info',
    medium: 'warning',
    high: 'danger',
  };

  severityToastMapping: { [key: string]: string } = {
    low: 'info',
    medium: 'warn',
    high: 'error',
  };

  getSeverityStyle(severity: string, type: 'toast' | 'chip'): string {
    return type === 'toast'
      ? this.severityToastMapping[severity] : this.severityChipMapping[severity];
  }

  fetchChemicals(): void {
    this.http.get<Chemical[]>(this.baseUrl).subscribe(
      (chemicals) => {
        this.chemicalsSubject.next(chemicals);
      },
      (error) => {
        console.error('Error fetching products:', error);
      },
    );
  }

  getChemicalById(id: number): Observable<Chemical> {
    return this.http
      .get<Chemical[]>(`${this.baseUrl}?id=${id}`)
      .pipe(map((chemicals) => chemicals[0]));
  }

  addChemical(chemical: Chemical): Observable<Chemical> {
    return this.http.post<Chemical>(this.baseUrl, chemical).pipe(
      tap((newProduct) => {
        this.chemicalsSubject.next([
          ...this.chemicalsSubject.value,
          newProduct,
        ]);
      }),
    );
  }
}
