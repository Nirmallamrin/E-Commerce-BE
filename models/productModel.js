import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
 image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type:String,
    required: true,
  }, 
  description: {
    type:String,
    required:true,
  }
  
  
},{timestamps: true},
);

const Product = mongoose.model("Product", productSchema)

export default Product;
