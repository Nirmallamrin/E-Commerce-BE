import Cart from "../models/cartModel.js";

export const getCartProducts = async (req, res) => {
    try {
        
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart.products);
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
        res.status(500).json({ error: `Error: ${err}` });
      }
};
       

export const deleteProductInCart = async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error getting cart products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};