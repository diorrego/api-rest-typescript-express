import { Request, Response } from 'express';
import { mongo } from 'mongoose';
import { Products, Product } from '../db/schemas/product';
import { sendError } from '../utils/catch';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await Products.find();
  res.send(products);
};

const getProductsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    if (product) {
      res.send(product);
    }
  } catch (e) {
    sendError(res, e);
  }
};

const postCreateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, year, color, pantone_value }: Product = req.body;
    const newProduct = await Products.create({
      name,
      year,
      color,
      pantone_value,
    });
    res.send(newProduct);
  } catch (e) {
    if (e instanceof mongo.MongoError) {
      res.status(400).send({ code: e.code, message: e.errmsg });
      return;
    }
    sendError(res, e);
  }
};

const putUpdateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, color, year, pantone_value } = req.body;
    const product = await Products.findByIdAndUpdate(productId, {
      name: name,
      color: color,
      year: year,
      pantone_value: pantone_value,
    });
    res.send(product);
  } catch (e) {
    sendError(res, e);
  }
};

const patchUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, year, color, pantone_value }: Product = req.body;
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.color = color || product.color;
      product.pantone_value = pantone_value || product.pantone_value;
      await product.save();
      res.send(product);
    }
  } catch (e) {
    sendError(res, e);
  }
};

const deleteProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const product = await Products.findByIdAndDelete(productId);
    res.send(product);
  } catch (e) {
    sendError(res, e);
  }
};

export {
  getProducts,
  getProductsById,
  postCreateProduct,
  putUpdateProduct,
  patchUpdateProduct,
  deleteProducts,
};
