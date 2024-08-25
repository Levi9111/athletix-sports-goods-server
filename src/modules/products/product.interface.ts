import { Model } from 'mongoose';

export interface TProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  image: string;
  features: string[];
}

// export interface ProductModel extends Model<TProduct> {
//   iProductExistsById(id: string): Promise<TProduct>;
// }
