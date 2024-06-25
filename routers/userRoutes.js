import express from "express";
import { signup, signin, signout, getUsers, getUserbyUserName, updateUserbyId, deleteUser,  resetPassword, forgetPassword,  } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', (req,res) => {
    res.send("user route")
})



userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/signout', signout);
userRouter.get('/users', getUsers);
userRouter.get('/username/:username', getUserbyUserName);
userRouter.patch('/:id', updateUserbyId);
userRouter.delete('/:id', deleteUser);
userRouter.post('/forgot-password', forgetPassword);
userRouter.post('/reset-password/:token', resetPassword);


export default userRouter;