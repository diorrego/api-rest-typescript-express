import { Router } from 'express';
import * as productsControllers from '../controllers/products-controller';

export const routerProducts = Router();

routerProducts.get('', productsControllers.getProducts);
routerProducts.get('/:productId', productsControllers.getProductsById);
routerProducts.post('/create', productsControllers.postCreateProduct);
routerProducts.put('/:productId', productsControllers.putUpdateProduct);
routerProducts.patch('/:productId', productsControllers.patchUpdateProduct);
routerProducts.delete('/:productId', productsControllers.deleteProducts);
