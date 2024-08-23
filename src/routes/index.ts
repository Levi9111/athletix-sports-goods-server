import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CustomrRoutes } from '../modules/customer/customer.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/customers',
    route: CustomrRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
