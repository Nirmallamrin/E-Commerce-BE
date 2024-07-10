import express from "express";
import authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
import { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/new',authenticateUser, newOrder)
orderRouter.get('/:id',authenticateUser, getSingleOrderDetails)

orderRouter.get('/myorders/me',myOrders)

orderRouter.get('/admin/orders', authenticateUser,authenticateAdmin, getAllOrders)
orderRouter.put('/admin/update/:id', authenticateUser,authenticateAdmin, updateOrder)
orderRouter.delete('/admin/delete/:id', authenticateUser,authenticateAdmin, deleteOrder)

export default orderRouter;
