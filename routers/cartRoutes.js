import express from 'express';
import authenticateUser from '../middlewares/user-middleware.js';
import { addProductInCart, deleteProductInCart, getCartProducts } from '../controllers/cartController.js';

const cartRouter = express.Router()

cartRouter.get('/carts', getCartProducts)
cartRouter.post('/', addProductInCart)
cartRouter.delete('/:id',  deleteProductInCart)
export default cartRouter