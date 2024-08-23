import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router = Router();

router.post('/', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch('/:id', ProductControllers.updateProduct);

router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
