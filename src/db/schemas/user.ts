import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  email: string;
  firts_name: string;
  last_name: string;
  avatar: string;
  password: string;
}

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  firts_name: String,
  last_name: String,
  avatar: String,
  password: { type: String, required: true },
});

const Users = model<User>('user', schema);

export default Users;
