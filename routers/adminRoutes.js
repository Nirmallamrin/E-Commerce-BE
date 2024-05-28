import express from 'express';
import { adminSignin, adminSignup } from '../controllers/adminController.js';

const adminRouter = express.Router()

adminRouter.post("/admin/signup", adminSignup)
adminRouter.post("/admin/signin", adminSignin)

export default adminRouter