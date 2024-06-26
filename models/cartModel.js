import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
       
     productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    count: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
