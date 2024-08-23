import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { customerSearchableFields } from './customer.constant';
import { Customer } from './customer.model';
import { AppError } from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TCustomer } from './customer.interface';

const getAllCustomersFromDB = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(Customer.find(), query)
    .search(customerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fileds();

  const result = await customerQuery.modelQuery;

  return result;
};

const getSingleCustomerFromDB = async (id: string) => {
  const result = await Customer.findOne({ id });

  return result;
};

const deleteCustomerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedCustomer = await Customer.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete customer');
    }

    const userId = deletedCustomer.user;

    const deletedUser = await User.findOneAndUpdate(
      { userId },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedCustomer;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete customer');
  }
};

const updateCustomerInfromDB = async (
  id: string,
  payload: Partial<TCustomer>,
) => {
  const {
    name,
    gender,
    dateOfBirth,
    contactNo,
    email,
    shippingAddress,
    billingAddress,
    profileImg,
  } = payload;

  const modifiedData: Record<string, unknown> = {};

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  modifiedData.gender = gender;
  modifiedData.dateOfBirth = dateOfBirth;
  modifiedData.contactNo = contactNo;
  modifiedData.email = email;
  modifiedData.shippingAddress = shippingAddress;
  modifiedData.billingAddress = billingAddress;
  modifiedData.profileImg = profileImg;

  const result = await Customer.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const CustomerServices = {
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  deleteCustomerFromDB,
  updateCustomerInfromDB,
};
