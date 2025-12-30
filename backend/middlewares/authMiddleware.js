import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { RefreshTokenService } from "../services/authService.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      // nếu access token hết hạn thì dùng refresh token
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) return res.status(401).json({ message: "Vui lòng đăng nhập lại" });

        try {
          const tokens = await RefreshTokenService(refreshToken);
          res.cookie("accessToken", tokens.accessToken, { httpOnly: true, sameSite: "lax", maxAge: 15*60*1000 });
          res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, sameSite: "lax", maxAge: 14*24*60*60*1000 });

          decoded = jwt.verify(tokens.accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (e) {
          return res.status(401).json({ message: e.message || "Refresh token không hợp lệ" });
        }
      } else {
        return res.status(401).json({ message: "Access token không hợp lệ" });
      }
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User không tồn tại" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
