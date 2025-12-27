import Category from "../models/categoryModel.js";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";

export const getListCategoryService = async () => {
  return await Category.find();
};

export const createCategoryService = async ({ name, description }) => {
  if (!name || !description) {
    throw new BadRequestError("Chưa nhập đầy đủ trường bắt buộc");
  }

  return await Category.create({ name, description });
};

export const deleteCategoryService = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new NotFoundError("Category không tồn tại");
  }
};

export const updateCategoryService = async ({ id, name, description }) => {
  if (!name || !description) {
    throw new BadRequestError("Name và description không được để trống");
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );

  if (!category) {
    throw new NotFoundError("Category không tồn tại");
  }

  return category;
};
