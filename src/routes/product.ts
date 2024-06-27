// src/routes/productRoutes.ts
import { Router } from 'express';
import { getAllProducts, getProductById, addProduct, getProductBynumber } from '../controller/productController';
import { addToCart, getCart } from '../controller/cartController';
import { addOrUpdateReactCartItems, getReactCartItems } from '../controller/reactController';
import { addOrder, getAllorderForUser } from '../controller/orderController';

const router: Router = Router();

router.get('/products', getAllProducts);
router.get('/products/:page', getProductBynumber);
router.get('/products-id/:id', getProductById);
router.post('/products', addProduct);
router.post('/cart', addToCart);
router.get('/cart/:userId', getCart);
router.get('/reactcart/:userId', getReactCartItems);
router.post('/reactcart/:userId', addOrUpdateReactCartItems);


router.get('/order/:userId' , getAllorderForUser)
router.post('/order' , addOrder)


export default router;
