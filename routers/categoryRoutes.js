import express from 'express';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router()

categoryRouter.get('/', getCategories )
categoryRouter.post('/', createCategory)

categoryRouter.get('/:id', getCategoryById)

categoryRouter.patch('/update/:id', updateCategory)

categoryRouter.delete('/delete/:id', deleteCategory)

export default categoryRouter