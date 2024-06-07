import express from 'express';
import authenticateUser from '../middlewares/user-middleware.js';
import { createOrder, paymentVerify, getPaymentStatus } from '../controllers/paymentController.js';
const paymentRouter = express.Router();

paymentRouter.post('/createorder', createOrder)
paymentRouter.post('/order/validate', paymentVerify)
paymentRouter.get('/status/:id',  getPaymentStatus);

export default paymentRouter