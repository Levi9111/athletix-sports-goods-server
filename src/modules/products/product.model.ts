import mongoose, { Document, Schema } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      maxlength: 18,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: {
      type: String,
      validate: {
        validator: (v: string) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(v),
        message: 'Product image URL must be a valid URL',
      },
    },
    features: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Product features must be a non-empty array of strings',
      },
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.isProductExistsByCustomId = async function (id: string) {
  return await Product.findOne({ id });
};

const Product = mongoose.model<TProduct, ProductModel>(
  'Product',
  productSchema,
);

export default Product;
