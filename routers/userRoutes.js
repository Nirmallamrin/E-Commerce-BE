import express from "express";
import { signup, signin, signout, getUsers, getUserbyUserName, updateUserbyId, deleteUser,  resetPassword, forgetPassword, updateProfile } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/adminController.js";
import  authenticateUser from "../middlewares/user-middleware.js";
import authenticateAdmin from "../middlewares/admin-middleware.js";
const userRouter = express.Router();

// userRouter.get('/', (req,res) => {
//     res.send("user route")
// })

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/signout", signout);
userRouter.get("/users", getUsers);
userRouter.get('/usersname/:username', getUserbyUserName);
userRouter.patch('/:id', updateUserbyId);
userRouter.delete('/:id', deleteUser);
userRouter.post('/forgot-password', forgetPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.put('/me/update', authenticateUser, updateProfile)
userRouter.get("/admin/users",authenticateUser, authenticateAdmin, getAllUsers);

export default userRouter;