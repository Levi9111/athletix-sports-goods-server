import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createSuperAdmin = catchAsync(async (req, res) => {});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer: customerData } = req.body;
  const result = await UserServices.createCustomerIntoDB(
    password,
    customerData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer account created successfully',
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createSuperAdmin,
  createCustomer,
};
