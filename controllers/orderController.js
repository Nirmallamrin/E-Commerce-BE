
import Order from '../models/orderModel.js';

export const newOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
         } = req.body

         const orderExist = await Order.findOne({ paymentMethod });

         if (orderExist) {
         return res.send("order already exist")
        }

         const order = await Order({
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
            paidAt: Date.now(),
             user: req.user._id,
         })

         orderCreated = await order.save()
         if(!orderCreated) {
            return res.Status(500).send("order is not created")
         }
         res.Status(201).send(orderCreated)

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

