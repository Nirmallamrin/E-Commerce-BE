import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import { adminToken} from "../generateToken.js";
import User from '../models/userModel.js';


export const adminSignup = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const adminExist = await Admin.findOne({email});

        if(adminExist) {
            return res.status(400).send("user is already exist")

        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new Admin({
            userName,
            email,
            hashPassword,
            role: 'admin' //set role to admin
        })

        const newAdminCreated = await newAdmin.save();

        if(!newAdminCreated) {
            res.status(500).send('User not created')
        }

        const token = adminToken(email, 'admin');

        res.cookie("token", token)
        res.status(201).send({message:"Admin signed up successfully"})

    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
}

export const adminSignin = async(req, res) => {
    try {
        const{ email, password} = req.body
        const admin = await Admin.findOne({email});

        if(!admin) {
            return res.send("User not found")
        }

        const matchPassword = await bcrypt.compare(password, admin.hashPassword)

        if(!matchPassword){
            return res.send("password is not correct");
        }

        const token = adminToken(email, 'admin');

        res.cookie("token", token);
        res.send({message: "Admin Logged in!", token});
    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
    
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.send(users)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal server error.");
    }
}

export const getSingleUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.Id)
        if(!user) {
            return (`User doesn't exist with id: ${req.params.id}`, 404)
        }
        return res.send(user)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal server error.");
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const role = req.body.role
        const user = await User.findById(req.params.Id)
        if(!user){
            res.status(403).json("user Not Found")
        }

        user.role = role;
        await user.save();

        return res.send(user)
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    const Id = req.params.Id;
    const deleteId = await User.deleteOne({_id: Id})
    if (!deleteId) {
        return res.send("not deleted");
      }
    return res.send("deleted user")
}

