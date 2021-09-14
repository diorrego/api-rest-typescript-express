import { Schema, model, Document } from 'mongoose';

interface Product extends Document {
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

const schema = new Schema({
  name: String,
  year: Number,
  color: String,
  pantone_value: String,
});

const Products = model<Product>('product', schema);

export { Products, Product };
