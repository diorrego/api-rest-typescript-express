import { Router } from 'express';
import * as usersControllers from '../controllers/users-controller';

export const routerUsers = Router();

routerUsers.post('/create', usersControllers.createUser);
routerUsers.get('', usersControllers.getUsers);
routerUsers.get('/:userId', usersControllers.getUsersById);
routerUsers.post('/login', usersControllers.login);
