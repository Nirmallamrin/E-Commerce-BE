import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProducts, getProductDetails, updateProduct } from '../controllers/productController.js';
import  authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
import upload from '../middlewares/upload-middleware.js';


const productRouter = express.Router()

productRouter.get('/products', getAllProducts)
productRouter.get('./products/all', getProducts)
productRouter.get('/:id', getProductDetails)

productRouter.post('/admin/products/new', authenticateUser, authenticateAdmin,upload.single('file'), createProduct)
productRouter.put('/admin/update/:id',authenticateUser,  authenticateAdmin,upload.single('image'), updateProduct)
productRouter.delete('/admin/delete/:id', deleteProduct)

export default productRouter;
