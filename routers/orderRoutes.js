import express from "express";
import authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
import { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/new',authenticateUser, newOrder)
orderRouter.get('/id',authenticateUser,getSingleOrderDetails)
orderRouter.get('/orders/new',authenticateUser,myOrders)

orderRouter.get('/admin/orders', authenticateUser,authenticateAdmin, getAllOrders)
orderRouter.put('/admin/order/:id' ,authenticateUser,authenticateAdmin, updateOrder)
orderRouter.delete('/admin/order/:id' ,authenticateUser,authenticateAdmin, deleteOrder)

export default orderRouter;
