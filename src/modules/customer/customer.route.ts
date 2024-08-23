import { Router } from 'express';
import { CustomerControllers } from './customer.controller';

const router = Router();

router.get('/', CustomerControllers.getAllCustomers);

router.get('/:id', CustomerControllers.getSingleCustomer);

router.patch('/:id', CustomerControllers.updateCustomerInfo);

router.delete('/:id', CustomerControllers.deleteCustomer);

export const CustomrRoutes = router;
