// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product, { IProduct } from '../model/productSchema';

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getProductBynumber = async(req:Request,res:Response)=>{
  try {
      const {page} = req.params
      const limit = 8;
      const offset = (Number(page) - 1) * limit;

    const products = await Product.find().skip(offset).limit(limit);
    const totalProducts = await Product.countDocuments();
    console.log(products)
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      data: products,
      meta: {
        totalItems: totalProducts,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });



  } catch (error) {
    console.log("error while fetching",error)
  }
}

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  // try {
    const { name, price, description, category, quantity,image } = req.body;
    const newProduct: IProduct = new Product({ name, price, description, category, quantity,image });
    await newProduct.save();
    console.log(newProduct)
    res.status(201).json(newProduct);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};
