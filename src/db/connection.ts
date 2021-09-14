import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//process.env returns (string | undefined)
//convert variable MONGO_URI to string
const MONGO_URI = (): string => {
  if (process.env.MONGO_URI) {
    return process.env.MONGO_URI;
  } else {
    return 'undefined';
  }
};

const connect = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_URI());
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default connect;
