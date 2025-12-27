import StoryCategory from "../models/storyCategoryModel.js";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";

export const getListStoryCategoryService = async () => {
  const storyCategory = await StoryCategory.find().lean();
  return storyCategory;
};

export const createStoryCategoryService = async ({ storyId, categoryId }) => {
  const exist = await StoryCategory.findOne({ storyId, categoryId });
  if (exist) throw new BadRequestError("Đã tồn tại storyCategory này");

  const storyCategory = await StoryCategory.create({ storyId, categoryId });
  return storyCategory;
};

export const deleteStoryCategoryService = async ({ storyId, categoryId }) => {
  const storyCategory = await StoryCategory.findOneAndDelete({ storyId, categoryId });
  if (!storyCategory) throw new NotFoundError("storyCategory không tồn tại hoặc đã bị xóa");

  return storyCategory;
};
