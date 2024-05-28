import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Invalid token.");
    }

    req.user = user;
    console.log(req.user.role)

    if (req.user.role !== "admin") {
      return res.status(403).send("Access denied. Admins only.");
    }

    next();
  });
}

export default authenticateAdmin;
