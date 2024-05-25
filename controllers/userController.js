import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../generateToken.js';

 export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const userExist = await User.findOne({email});

        if (userExist){
            return res.send("User is already exist")
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName,
            email,
            hashPassword
        });

        const newUserCreated = await newUser.save()

        if (!newUserCreated) {
            return res.send("user is not created")
        }

        const token = generateToken(email);

        res.cookie("token", token)
        res.send("Signed Successfully!")
            
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.send("User not found");
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword);

        if (!matchPassword) {
            return res.send("Password is not correct");
        }

        const token = generateToken(email);
        res.cookie("token", token);
        res.send("Logged in!");
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}

export const signout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
 
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if(!users){
            res.status(404).json({error:'Users not found'})
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}

export const getUserbyUserName = async (req,res) => {
    try{

        const user = await User.findOne({ userName: req.params.username }).exec();
        if(!user) {
            res.status(404).json({error:'User not found'})
        }
        res.status(200).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})

    }
}

export const updateUserbyId = async (req,res) => {
    try{

        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true} )
        if(!user) {
            res.status(404).json({error:'User not found'})
        }
        res.status(200).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})

    }
}

export const deleteUser = async (req,res) => {
    try{

        const user = await User.findByIdAndDelete(req.params.id,req.body,{new:true} )
        if(!user) {
            res.status(404).json({error:'User not found'})
        }
        res.status(200).json({message:"successfully deleted"})
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})

    }
}