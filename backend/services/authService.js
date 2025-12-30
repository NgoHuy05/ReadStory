import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { BadRequestError, ConflictError } from "../utils/errors/index.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/sessionModel.js";

const ACCESS_TOKEN_TTL = "15m"; 
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; 

export const SignUpService = async (data) => {
    const {username, fullname, email, password, repassword} = data;
    if (!username || !fullname || !email || !password || !repassword) {
        throw new BadRequestError("Chưa điền đầy đủ các trường bắt buộc");
    }
    if (password !== repassword) {
        throw new BadRequestError("Mật khẩu xác nhận không trùng nhau");
    }
    const existingUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if (existingUser) {
        throw new ConflictError("Tài khoản hoặc email đã tồn tại");
    }

    const hassedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        fullname,
        email,
        password: hassedPassword,
        displayName: fullname
    });
}

export const SignInService = async (data) => {
    const {username, password} = data;
    if (!username || !password) {
        throw new BadRequestError("Chưa nhập đầy đủ trường bắt buộc");
    }
    const user = await User.findOne({username});
    if (!user) {
        throw new BadRequestError("Tài khoản hoặc mật khẩu chưa chính xác");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        throw new BadRequestError("Tài khoản hoặc mật khẩu chưa chính xác");
    }
    const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.create({
        userId: user._id,
        refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
    });

    return {user, accessToken, refreshToken}
}

export const SignOutService = async (refreshToken) => {
    if (!refreshToken) return;
    await Session.deleteOne({ refreshToken });
};

export const RefreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new BadRequestError("Không có refresh token");
  }

  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw new BadRequestError("Refresh token không hợp lệ");
  }

  if (session.expiresAt < new Date()) {
    await Session.deleteOne({ _id: session._id });
    throw new BadRequestError("Phiên đăng nhập đã hết hạn");
  }

  const newRefreshToken = crypto.randomBytes(64).toString("hex");
  session.refreshToken = newRefreshToken;
  await session.save();

  const newAccessToken = jwt.sign(
    { userId: session.userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

export const getProfileService = async (userId) => {
  if (!userId) throw new UnauthorizedError("Vui lòng đăng nhập");

  const user = await User.findById(userId).select("-password");
  if (!user) throw new NotFoundError("Người dùng không tồn tại");

  return user;
};