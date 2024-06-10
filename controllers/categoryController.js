import Category from "../models/categoryModel.js";

export const getCategories = async (req,res) => {
    try {
        const categories = await Category.find({})
        res.send(categories)
    } catch (error) {
        
    }
}

export const getCategoryById = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.send(category)
    } catch (error) {
        
    }
}

export const createCategory = async (req,res) => {
    try {
        const {name, description} = req.body;

        const category =  new Category ({
            name,
            description,
        })

        const categoryCreated = await  category.save()

        res.send( categoryCreated);
    } catch (error) {
        
    }
}

export const updateCategory = async (req, res) => {
    try {
        
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });
    
        // if(!updatedCategory) {
        //     return res.status(404).send("category is not update")
        // }
        res.status(200).send(updatedCategory)
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.send("Category Deleted")
    } catch (error) {
        
    }
}

