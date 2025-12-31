import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);      
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) return res.status(401).json({ message: "Người dùng không tồn tại" });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
  } catch (err) {
      return res.status(401).json({ message: "Lỗi hệ thống" });
  }
};

