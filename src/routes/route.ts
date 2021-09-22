import { Application } from 'express';
import { routerUsers } from './user-router';
import { routerProducts } from './product-router';

const createRoutes = (app: Application): void => {
  app.use('/api/users', routerUsers);
  app.use('/api/users', routerProducts);
};

export { createRoutes };
