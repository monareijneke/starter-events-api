import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; //gets the token from authentication (login.js)
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key"; //creates a key

  if (!token) {
    return res.status(401).json({ message: "You need to login first!!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    //checks combination token/secretKey is valid or not
    if (err) {
      return res.status(403).json({ message: "invalid token!!" });
    }
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
