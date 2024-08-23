import { TProduct } from './product.interface';

const getAllProductsFromDB = async (query: Record<string, unknown>) => {};

const getSingleProductFromDB = async (id: string) => {};

const createProductIntoDB = async (payload: TProduct) => {};

const updateProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {};

const deleteProductFromDB = async (id: string) => {};

export const ProductServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
