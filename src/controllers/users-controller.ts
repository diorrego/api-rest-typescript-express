import { Request, Response } from 'express';
import Users from '../db/schemas/user';
import { mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import { sendError } from '../utils/catch';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 });
  res.send(users);
};

const getUsersById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await Users.findById(userId).select({ password: 0, __v: 0 });
    if (user) {
      res.send(user);
    }
  } catch (e) {
    sendError(res, e);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 15);
    const newUser = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash,
    });
    res.send(newUser);
    console.log(newUser);
  } catch (e) {
    if (e instanceof mongo.MongoError) {
      res.status(400).send({ code: e.code, message: e.errmsg });
      return;
    }
    sendError(res, e);
  }
};

export { getUsers, getUsersById, createUser };
