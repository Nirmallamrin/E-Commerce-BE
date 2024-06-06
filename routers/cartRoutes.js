import express from 'express';
import authenticateUser from '../middlewares/user-middleware.js';
import { addProductInCart, deleteProductInCart, getCartProducts } from '../controllers/cartController.js';

const cartRouter = express.Router()

cartRouter.get('/carts',authenticateUser, getCartProducts)
cartRouter.post('/add',authenticateUser, addProductInCart)
cartRouter.delete('/delete/:id', authenticateUser, deleteProductInCart)
export default cartRouter