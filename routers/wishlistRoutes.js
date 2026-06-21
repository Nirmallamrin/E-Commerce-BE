import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import authenticateUser from "../middlewares/user-middleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get('/', authenticateUser, getWishlist);
wishlistRouter.post('/add', authenticateUser, addToWishlist);
wishlistRouter.post('/remove', authenticateUser, removeFromWishlist);

export default wishlistRouter;
