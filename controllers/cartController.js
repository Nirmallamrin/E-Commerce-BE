import Cart from "../models/cartModel.js";

export const getCartProducts = async (req, res) => {
    try {
        
        
        const carts = await Cart.find({ userId: req.user._id }).populate('productId');

        if (!carts) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).send(carts);
    } catch (error) {
        console.error('Error getting cart products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addProductInCart = async (req, res) => {
    try {
        const { productId, count } = req.body;
        const cart = await Cart.findOneAndUpdate(
          { productId },
          { productId, count,  },
          { upsert: true, new: true }
        );
    
        res.status(201).json({ status: 'ok', cart });
      } catch (err) {
        console.error(err);
        
      }
};
       

export const deleteProductInCart = async (req, res) => {
    try {
        const deleteId = await Cart.findByIdAndDelete(req.params.id)
        if (!deleteId) {
            return res.send("not deleted");
          }
        return res.send("cart deleted ")
    } catch (error) {
        console.log(error)
    }
};