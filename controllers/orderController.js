
import Order from '../models/orderModel.js';

export const newOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
         } = req.body

         const order = await Order.create({
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
         })

        res.send(order)
    } catch (error) {
        console.log(error)
    }
}

export const getSingleOrderDetails = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const myOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getAllOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateOrder = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteOrder = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

