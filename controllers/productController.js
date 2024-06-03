import { cloudinaryInstance } from "../config/cloudinary.js";
import cloudinary from 'cloudinary';
import Admin from "../models/adminModel.js"
import Product from "../models/productModel.js";


export const getAllProducts = async (req, res) => {
        const products = await Product.find();
        res.send(products);
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
                      const imageUrl = result.secure_url;
                      const imagePublicId = result.public_id;

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
                        image: { 
                          url: imageUrl,
                          public_id: imagePublicId
                      },
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

export const getProducts = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id).exec();
  res.send(product)
}

export const updateProduct = async (req, res) => {
    try {
      const currentProduct = await Product.findById(req.params.id);

      const data = {
        title : req.body.title,
        description : req.body.description,
        price: req.body.price,
        ratings: req.body.ratings,
        category: req.body.category,
      }

      if(req.file) {
        const ImgId = currentProduct.image.public_id;
        if(ImgId){
          await cloudinary.uploader.destroy(ImgId);
        }

        const newImage = await cloudinary.uploader.upload(req.file.path)

        data.image = {
          public_id: newImage.public_id,
          url:newImage.secure_url
        };
      }

      const productUpdate = await Product.findByIdAndUpdate(req.params.id, data, {new:true})
      res.send(productUpdate);
     
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to update product");
    }
}



export const deleteProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

