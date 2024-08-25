import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import Product from './product.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { generateCustomProductId } from './product.utils';

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fileds();

  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

const createProductIntoDB = async (payload: TProduct) => {
  payload.id = generateCustomProductId();
  const result = await Product.create(payload);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const {
    name,
    description,
    category,
    brand,
    price,
    discount,
    image,
    features,
  } = payload;

  const modifiedData: Record<string, unknown> = {};

  modifiedData.name = name;
  modifiedData.description = description;
  modifiedData.category = category;
  modifiedData.brand = brand;
  modifiedData.price = price;
  modifiedData.discount = discount;
  modifiedData.image = image;
  modifiedData.features = features;

  const result = await Product.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete product');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedProduct;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete product');
  }
};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
