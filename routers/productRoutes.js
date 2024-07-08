import express from 'express';
import { createProduct, deleteProduct, getAllProducts,getCategoryOfProducts, getProducts, getProductDetails, updateProduct } from '../controllers/productController.js';
import  authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
import multer from 'multer';
import upload from '../middlewares/upload-middleware.js';


const productRouter = express.Router()

productRouter.get('/products', getAllProducts)
productRouter.get('/products/all', getProducts)
productRouter.get('/products/getcategoryofproducts', getCategoryOfProducts)

productRouter.get('/products/:id', getProductDetails)


productRouter.post('/admin/products/new',upload.single('image'), createProduct)
productRouter.put('/admin/update/:id',upload.single('image'), updateProduct)
productRouter.delete('/admin/delete/:id', deleteProduct)

export default productRouter;
