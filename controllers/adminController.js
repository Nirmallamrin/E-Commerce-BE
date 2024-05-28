import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../generateToken.js";

export const adminSignup = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(400).send("user is already exist")

        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName,
            email,
            password,
            role: 'admin' //set role to admin
        })

        const newUserCreated = await newUser.save();

        if(!newUserCreated) {
            res.status(500).send('User not created')
        }

        const token = generateToken(email, 'admin');

        res.cookie("token", token)
        res.status(201).send("Admin signed up successfully")

    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
}

export const adminSignin = async(req, res) => {
    try {
        const{ email, password} = req.body
        const user = await User.findOne({email});

        if(!user) {
            return res.send("User not found")
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword)

        if(!matchPassword){
            return res.send("password is not correct");
        }

        const token = generateToken(email);
        res.cookie("token", token);
        res.send("Admin logged in successfully")
    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
    
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal server error.");
    }
}
