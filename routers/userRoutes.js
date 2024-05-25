import express from "express";
import { signup, signin, signout, getUsers, getUserbyUserName, updateUserbyId, deleteUser } from "../controllers/userController.js";
const userRouter = express.Router();

// userRouter.get('/', (req,res) => {
//     res.send("user route")
// })

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/signout", signout);
userRouter.get("/users", getUsers);
userRouter.get('/usersname/:username', getUserbyUserName)
userRouter.patch('/:id', updateUserbyId)
userRouter.delete('/:id', deleteUser)

export default userRouter;