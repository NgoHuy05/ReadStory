import {
  getListStoryCategoryService,
  createStoryCategoryService,
  deleteStoryCategoryService
} from "../services/storyCategoryService.js";

export const getListStoryCategory = async (req, res, next) => {
  try {
    const storyCategory = await getListStoryCategoryService();
    res.status(200).json({ message: "Lấy danh sách storyCategory thành công", storyCategory });
  } catch (err) {
    next(err);
  }
};

export const createStoryCategory = async (req, res, next) => {
  try {
    const storyCategory = await createStoryCategoryService(req.body);
    res.status(201).json({ message: "Tạo storyCategory thành công", storyCategory });
  } catch (err) {
    next(err);
  }
};

export const deleteStoryCategory = async (req, res, next) => {
  try {
    const storyCategory = await deleteStoryCategoryService(req.body);
    res.status(200).json({ message: "Xóa storyCategory thành công", storyCategory });
  } catch (err) {
    next(err);
  }
};
