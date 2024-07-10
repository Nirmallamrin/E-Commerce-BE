import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js"; // Adjust the path to your User model
dotenv.config();

async function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token, "token");

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded token");

    // Fetch the user from the database
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err, "err");
    return res.sendStatus(403);
  }
}

export default authenticateUser;
