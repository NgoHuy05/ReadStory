import {
  getListStoryCategoryService,
  createStoryCategoryService,
  deleteStoryCategoryService
} from "../services/storyCategoryService.js";

export const getListStoryCategory = async (req, res, next) => {
  try {
    const categoryStories = await getListStoryCategoryService();
    res.status(200).json({ message: "Lấy danh sách storyCategory thành công", categoryStories });
  } catch (err) {
    next(err);
  }
};

export const createStoryCategory = async (req, res, next) => {
  try {
    const categoryStory = await createStoryCategoryService(req.body);
    res.status(201).json({ message: "Tạo storyCategory thành công", categoryStory });
  } catch (err) {
    next(err);
  }
};

export const deleteStoryCategory = async (req, res, next) => {
  try {
    const storyCategory = await deleteStoryCategoryService(
      {
        storyId: req.params.storyId,
        categoryId: req.params.categoryId
      });
    res.status(200).json({
      message: "Xóa storyCategory thành công",
      categoryStoryId: storyCategory._id
    });
  } catch (err) {
    next(err);
  }
};
