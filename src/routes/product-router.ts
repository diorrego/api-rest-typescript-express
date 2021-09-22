import { Router } from 'express';
import * as productsControllers from '../controllers/products-controller';
import { checkAuth } from '../middlewares/auth-middleware';

export const routerProducts = Router();

routerProducts.get('', checkAuth, productsControllers.getProducts);
routerProducts.get(
  '/:productId',
  checkAuth,
  productsControllers.getProductsById
);
routerProducts.post(
  '/create',
  checkAuth,
  productsControllers.postCreateProduct
);
routerProducts.put(
  '/:productId',
  checkAuth,
  productsControllers.putUpdateProduct
);
routerProducts.patch(
  '/:productId',
  checkAuth,
  productsControllers.patchUpdateProduct
);
routerProducts.delete(
  '/:productId',
  checkAuth,
  productsControllers.deleteProducts
);
