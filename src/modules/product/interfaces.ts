import { Product } from '../../entities/product.entity';

export interface ProductList {
  rows: Array<Product>;
  count: number;
}
