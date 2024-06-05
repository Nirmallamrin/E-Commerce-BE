import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    orderItems: [
      {
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
      phoneNo: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // paidAt: {
    //   type: Date,
    //   required: true,
    // },
   
    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema)

export default Order;
