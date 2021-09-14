import { Application } from 'express';
import * as usersControllers from '../controllers/users-controller';
import * as productsControllers from '../controllers/products-controller';

const createRoutes = (app: Application): void => {
  app.post('/api/users/create', usersControllers.createUser);
  app.get('/api/users', usersControllers.getUsers);
  app.get('/api/users/:userId', usersControllers.getUsersById);
  app.get('/api/products/', productsControllers.getProducts);
  app.get('/api/products/:productId', productsControllers.getProductsById);
  app.post('/api/products/create', productsControllers.postCreateProduct);
  app.put('/api/products/:productId', productsControllers.putUpdateProduct);
  app.patch('/api/products/:productId', productsControllers.patchUpdateProduct);
  app.delete('/api/products/:productId', productsControllers.deleteProducts);
};

export { createRoutes };
