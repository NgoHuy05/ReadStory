import User from "../models/userModel.js";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../utils/errors/index.js";



export const getListUserService = async () => {
  const users = await User.find().select("-password");
  if (!users.length) throw new NotFoundError("Người dùng không tồn tại");
  return users;
};

export const updateProfileService = async (userId, data) => {
  if (!userId) throw new UnauthorizedError("Vui lòng đăng nhập");

  const { displayName, fullname } = data;

  const user = await User.findByIdAndUpdate(
    userId,
    { displayName, fullname },
    { new: true }
  ).select("-password");

  if (!user) throw new NotFoundError("Người dùng không tồn tại");
  return user;
};

export const deleteUserService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new NotFoundError("Người dùng không tồn tại");
  return user;
};
