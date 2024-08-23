import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidations } from '../customer/customer.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidations.adminValidationSchema),
  UserControllers.createAdmin,
);

router.post(
  '/create-customer',
  validateRequest(CustomerValidations.customerValidationSchema),
  UserControllers.createCustomer,
);

export const UserRoutes = router;
