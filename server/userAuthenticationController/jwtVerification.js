import "dotenv/config.js";
import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    req.user = user.id;
    next();
  });
};

export default verifyJwt;
