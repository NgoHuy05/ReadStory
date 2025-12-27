import {
  getProfileService,
  getListUserService,
  updateProfileService,
  deleteUserService
} from "../services/userService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getProfileService(req.user?._id);
    res.status(200).json({ message: "Lấy thông tin người dùng thành công", user });
  } catch (err) {
    next(err);
  }
};

export const getListUser = async (req, res, next) => {
  try {
    const users = await getListUserService();
    res.status(200).json({ message: "Lấy danh sách người dùng thành công", users });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateProfileService(req.user?._id, req.body);
    res.status(200).json({ message: "Cập nhật thông tin người dùng thành công", user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    await deleteUserService(userId);
    res.status(200).json({ message: "Xoá người dùng thành công" });
  } catch (err) {
    next(err);
  }
};
