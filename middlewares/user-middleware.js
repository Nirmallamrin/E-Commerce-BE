import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/userModel.js'
dotenv.config();

// function authenticateUser(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).send({ error: 'Token must be provided' });
// }

// jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//   console.log(err);

//   if (err) return res.sendStatus(403);

 

//   req.user = user;
//   console.log(req.user.role);

//   next();
// });
// }

function authenticateUser (req, res, next) {
  const token = req.cookies.token;
  if(!token) {
    return res.send("Token must be provided")
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = User.findById(decodedData.id)
  next();
}


export default authenticateUser;
