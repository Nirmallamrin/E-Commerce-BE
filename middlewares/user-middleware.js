import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/userModel.js'
dotenv.config();


function authenticateUser(req, res, next) {
  const token = req.cookies.token;
  console.log(token, "token")
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    
  console.log(err, "err");

  if (err) return res.sendStatus(403);

  req.user = user;
    

  next();
  });
}

export default authenticateUser;;
