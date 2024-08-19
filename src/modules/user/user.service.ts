import httpStatus from 'http-status';
import { AppError } from '../../app/errors/AppError';
import { TCustomer } from '../customer/customer.interface';
import { TUser } from './user.interface';
import mongoose from 'mongoose';
import { generateCustomerId } from './user.utils';
import { User } from './user.model';
import { Customer } from '../customer/customer.model';

const createAdminIntoDB = async () => {};

const createSuperAdminIntoDB = async () => {};

const createCustomerIntoDB = async (password: string, payload: TCustomer) => {
  const userData: Partial<TUser> = {};

  if (!password) throw new AppError(httpStatus.NOT_FOUND, 'Password not found');

  userData.password = password;
  userData.role = 'customer';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateCustomerId();
    console.log(userData.id);
    const newUser = await User.create([userData], { session });
    console.log({ password, payload, userData });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newCustomerData = await Customer.create([payload], { session });

    if (!newCustomerData.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new customer',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return newCustomerData;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createAdminIntoDB,
  createSuperAdminIntoDB,
  createCustomerIntoDB,
};
