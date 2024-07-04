import express from 'express';
import { adminSignin, adminSignup } from '../controllers/adminController.js';
import authenticateAdmin from '../middlewares/admin-middleware.js';
import authenticateUser from '../middlewares/user-middleware.js';
import { getAllUsers, getSingleUsers, updateUserRole, deleteUser } from '../controllers/adminController.js';

const adminRouter = express.Router()

adminRouter.post("/signup", adminSignup)
adminRouter.post("/signin", adminSignin)
adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:Id", authenticateUser, authenticateAdmin, getSingleUsers)
adminRouter.put("/users/:Id", authenticateUser, authenticateAdmin, updateUserRole)
adminRouter.delete("/users/:Id", authenticateUser, authenticateAdmin, deleteUser)

export default adminRouter;