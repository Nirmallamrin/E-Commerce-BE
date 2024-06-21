import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../generateToken.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.send("User is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);

    res.cookie("token", token);
    res.send({message:"Signed Successfully!"});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send({message: "Logged in!"});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

export const signout = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).json({ error: "Users not found" });
    }
    return res.send(users)
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

export const getUserbyUserName = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username }).exec();
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
     return res.send(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserbyId = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const forgetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
        const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
          <p>The link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
       transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  export const resetPassword = async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
  
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }
  
      const user = await User.findOne({ _id: decodedToken.userId });
      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }
  
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
  
      user.hashPassword = req.body.newPassword;
      await user.save();
  
      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

export const updateProfile = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}


