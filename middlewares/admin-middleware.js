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
      console.error("JWT Verification Error:", err);
      return res.status(403).send("Invalid token.");
    }

    if (!user || user.role !== "admin") {
      return res.status(403).send("Access denied. Admins only.");
    }

    req.user = user; // Attach the user object to the request
    console.log("Authenticated User:", req.user);
    next();
  });
}

export default authenticateAdmin;
