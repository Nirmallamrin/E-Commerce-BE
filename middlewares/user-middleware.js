import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token, "token");
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err, "err");

    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

export default authenticateUser;
