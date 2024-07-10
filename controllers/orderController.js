import Order from '../models/orderModel.js';

export const newOrder = async (req, res) => {
    try {
        
        const {
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
         } = req.body

         const order = await Order({
            shippingAddress,
            orderItems,
            paymentMethod,
            totalPrice,
            user: req.user._id,         
         });

        const orderCreated = await order.save()
         if (!orderCreated) {
            return res.status(500).send("Order could not be created");
        }
        res.status(201).send(orderCreated)

        
    } catch (error) {
        console.log(error)
    }
};

export const getSingleOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
    
        if(!order) {
            return res.status(404).send("Order Not Found");
        }
        res.send(order)
    } catch (error) {
        console.log(error)
    }
}

export const myOrders = async (req, res) => {
    try {
        
        const order = await Order.find({user: req.user._id,})
        

        if (!order) {
            return res.status(404).send("Orders Not Found");
        }
        res.send(order)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders) {
            return res.status(404).send("Orders Not Found");
        }

        let totalAmount = 0;
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        })

       res.status(200).send({ orders, totalAmount });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id,);

        if (!order) {
            return res.status(404).send("Order Not Found");
        }
        const { orderItems,totalPrice, shippingAddress, paymentMethod } = req.body;
        if(orderItems) order.orderItems = orderItems;
        if(totalPrice) order.totalPrice = totalPrice;
        if (shippingAddress) order.shippingAddress = shippingAddress;
        if (paymentMethod) order.paymentMethod = paymentMethod;

        const updatedOrder = await order.save()

        res.status(200).json(updatedOrder);

    } catch (error) {
        
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.send("order deleted")
    } catch (error) {
        
    }
}

