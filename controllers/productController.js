import { cloudinaryInstance } from "../config/cloudinary.js";
import Admin from "../models/adminModel.js";
import Product from "../models/productModel.js";


export const getAllProducts = async (req, res) => {
        const products = await User.find()
        return res.send(products);
}

export const createProduct = async (req, res) => {
    try {
        console.log("hitted")
        if(!req.file) {
            return res.send("file is not visible")
        }
        cloudinaryInstance.uploader.upload(req.file.path, async(err, result) => {
            if(err) {
                console.log(err, "error") 
                    return res.status(500).json({
                        success: false,
                        message: "Error",
                      });
                    }
                      console.log(result)
                      const imageUrl = result.url;

                      const {title, description, price, ratings,category, adminEmail } = req.body

                      const findAdmin = await Admin.findOne({ email: adminEmail });

                      if(!findAdmin) {
                        return res.send("Please add Admin")
                      }

                      const newProduct = new Product({
                        title,
                        description,
                        price,
                        ratings,
                        category,
                        image: imageUrl,
                        admin: findAdmin._id
                      })

                      const newProductCreated = await newProduct.save()
                      if (!newProductCreated) {
                        return res.status(500).send("Product is not created");
                      }
                      return res.send(newProductCreated);

        } );
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to create product");
    }
}

export const getPrdoucts = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getProductDetails = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

