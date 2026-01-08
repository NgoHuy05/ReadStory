import {
  getListStoryCategoryService,
  createStoryCategoryService,
  deleteStoryCategoryService,
  getListStoryCategoryBySlugCategoryService
} from "../services/storyCategoryService.js";

export const getListStoryCategory = async (req, res, next) => {
  try {
    const categoryStories = await getListStoryCategoryService();
    res.status(200).json({ message: "Lấy danh sách storyCategory thành công", categoryStories });
  } catch (err) {
    next(err);
  }
};

export const getListStoryCategoryBySlugCategory = async (req, res, next) => {
  try {
    const { slugCategory } = req.params;
    const categoryStories = await getListStoryCategoryBySlugCategoryService(slugCategory);
    res.status(200).json({ message: "Lấy danh sách storyCategory theo slug thành công", categoryStories });
  } catch (err) {
    next(err);
  }
};

export const createStoryCategory = async (req, res, next) => {
  try {
    const { storyId, categoryId } = req.body;
    const categoryStory = await createStoryCategoryService({ storyId, categoryId });
    res.status(201).json({ message: "Tạo storyCategory thành công", categoryStory });
  } catch (err) {
    next(err);
  }
};

export const deleteStoryCategory = async (req, res, next) => {
  try {
    const { storyId, categoryId } = req.params;
    const storyCategory = await deleteStoryCategoryService(
      {
        storyId,
        categoryId
      });
    res.status(200).json({
      message: "Xóa storyCategory thành công",
      categoryStoryId: storyCategory._id
    });
  } catch (err) {
    next(err);
  }
};
