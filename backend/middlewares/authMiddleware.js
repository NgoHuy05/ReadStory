import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User không tồn tại" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access token hết hạn" });
  }
};
