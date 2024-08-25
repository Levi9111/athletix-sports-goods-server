import httpStatus from 'http-status';
import { AppError } from '../../app/errors/AppError';
import { TCustomer } from '../customer/customer.interface';
import { TUser } from './user.interface';
import { generateAdminId, generateCustomerId } from './user.utils';
import { User } from './user.model';
import { Customer } from '../customer/customer.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createSuperAdminIntoDB = async () => {};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  if (!password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password not found');
  }

  userData.password = password;
  userData.role = 'admin';

  userData.id = await generateAdminId();
  const newUser = await User.create(userData);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
  }

  payload.id = newUser.id;
  payload.user = newUser._id;

  const newAdminData = await Admin.create(payload);

  return newAdminData;
};

const createCustomerIntoDB = async (password: string, payload: TCustomer) => {
  const userData: Partial<TUser> = {};

  if (!password) throw new AppError(httpStatus.NOT_FOUND, 'Password not found');

  userData.password = password;
  userData.role = 'customer';

  userData.id = await generateCustomerId();
  const newUser = await User.create(userData);

  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
  }

  payload.id = newUser.id;
  payload.user = newUser._id;

  const newCustomerData = await Customer.create(payload);

  if (!newCustomerData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new customer');
  }

  return newCustomerData;
};

export const UserServices = {
  createAdminIntoDB,
  createSuperAdminIntoDB,
  createCustomerIntoDB,
};
