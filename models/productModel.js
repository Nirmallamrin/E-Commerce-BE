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
  description: {
    type: String,
    required: true,

  },
  ratings: {
    type: Number,
    default: 0,
    min:0,
    max:5

},
admin: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Admin',
  required: true,
},
  category: {
    type: String,
    required: true,
  }, 
},{timestamps: true},
);

const Product = mongoose.model("Product", productSchema)

export default Product;
