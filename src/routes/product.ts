// src/routes/productRoutes.ts
import { Router } from 'express';
import { getAllProducts, getProductById, addProduct } from '../controller/productController';
import { addToCart, getCart } from '../controller/cartController';

const router: Router = Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', addProduct);
router.post('/cart', addToCart);
router.get('/cart/:userId', getCart);

export default router;
