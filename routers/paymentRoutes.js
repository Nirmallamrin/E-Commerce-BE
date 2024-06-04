import express from 'express';
import authenticateUser from '../middlewares/user-middleware.js';
import { processPayment, paymentResponse, getPaymentStatus } from '../controllers/paymentController.js';
const paymentRouter = express.Router();

paymentRouter.post('/payment/process', processPayment)
paymentRouter.post('/callback', paymentResponse)
paymentRouter.get('/payment/status/:id', authenticateUser, getPaymentStatus);

export default paymentRouter