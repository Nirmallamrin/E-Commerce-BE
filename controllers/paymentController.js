import Razorpay from "razorpay";
import Payment from "../models/paymentModel.js";
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay ({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
    try {
        const {amount, currency, receipt, notes} = req.body

        const options = {
            amount: amount * 100,
            currency,
            receipt,
            notes
        }

        const order = await razorpayInstance.orders.create(options);
        
        const payment = new Payment ({
            orderId: order.id,
            entity: order.entity,
            amount: order.amount,
            amountPaid: order.amount_paid,
            amountDue: order.amount_due,
            currency: order.currency,
            receipt: order.receipt,
            notes:order.notes,
            status: order.status,
            attempts: order.attempts,
            createdAt: new Date(order.created_at * 1000)
        })

        await payment.save();

        res.status(201).send(order)
    } catch (error) {
        console.error('Error creating order:', error);

    }
}

export const paymentVerify = async (req, res) => {
    try {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)

        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
        const digest = hmac.digest("hex");
        if (digest !== razorpay_signature) {
            return res.status(400).json({msg: "transaction is not legit"})
        }

        res.json({
            msg:"success",
            orderId:razorpay_order_id,
            paymentId: razorpay_payment_id,
        });

    } catch (error) {
        console.log(error)
    }
}

export const getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)

        if(!payment) {
            res.status(404).send("Payment not found")
        }
        res.send(payment)
    } catch (error) {
        console.log(error)
    }
}