import Wishlist from "../models/wishlistModel.js";
import User from "../models/userModel.js";

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.data });
        if (!user) return res.status(404).json({ message: "User not found" });

        const wishlists = await Wishlist.find({ userId: user._id }).populate('productId');
        // The frontend expects an array of product objects
        const products = wishlists.map(item => item.productId).filter(Boolean);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findOne({ email: req.user.data });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        await Wishlist.findOneAndUpdate(
            { userId: user._id, productId },
            { userId: user._id, productId },
            { upsert: true, new: true }
        );
        
        res.status(200).json({ message: "Added to wishlist" });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findOne({ email: req.user.data });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        await Wishlist.findOneAndDelete({ userId: user._id, productId });
        
        res.status(200).json({ message: "Removed from wishlist" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
