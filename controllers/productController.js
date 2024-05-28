import User from "../models/userModel";

export const getAllProducts = async (req, res) => {
        const products = await User.find()
        res.send(products);
}

export const createProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}