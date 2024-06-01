import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getPrdoucts, getProductDetails, updateProduct } from '../controllers/productController.js';
import  authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
import upload from '../middlewares/upload-middleware.js';


const productRouter = express.Router()

productRouter.get('/products', getAllProducts)
productRouter.get('./products/all', getPrdoucts)
productRouter.get('./product/:id', getProductDetails)


productRouter.post('/admin/products/new', authenticateUser, authenticateAdmin,upload.single('file'), createProduct)
productRouter.put('./admin/product/:id', authenticateUser, authenticateAdmin, updateProduct)
productRouter.delete('./admin/product/:id', authenticateUser, authenticateAdmin, deleteProduct)

export default productRouter;
