import { Chemical } from '../chemical/chemical.model';

export interface Product {
  id: number;
  name: string;
  chemicals: Chemical[];
}

export interface ProductDTO {
  id: number;
  name: string;
  chemicals: number[];
}
