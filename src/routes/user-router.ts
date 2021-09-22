import { Router } from 'express';
import * as usersControllers from '../controllers/users-controller';
import { checkAuth } from '../middlewares/auth-middleware';

export const routerUsers = Router();

routerUsers.post('/create', usersControllers.createUser);
routerUsers.get('', checkAuth, usersControllers.getUsers);
routerUsers.get('/:userId', checkAuth, usersControllers.getUsersById);
routerUsers.post('/login', usersControllers.login);
