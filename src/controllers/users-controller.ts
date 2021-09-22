import { Request, Response } from 'express';
import Users from '../db/schemas/user';
import { mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import { sendError } from '../utils/catch';
import jwt from 'jsonwebtoken';

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

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      throw { code: 404, message: 'User not found' };
    }
    const isOk: boolean = await bcrypt.compare(password, user.password);
    if (!isOk) {
      throw { code: 401, message: 'Invalid password' };
    }

    const expiresIn = 60 * 60; //1 hour

    const JWT_SECRET = (): string => {
      if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
      } else {
        throw { code: 404, message: 'Invalid process jwt' };
      }
    };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET(),
      { expiresIn }
    );
    res.send({ token, expiresIn });
  } catch (e) {
    sendError(res, e);
  }
};

export { getUsers, getUsersById, createUser, login };
