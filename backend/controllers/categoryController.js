import {
  createCategoryService,
  deleteCategoryService,
  getListCategoryService,
  updateCategoryService
} from "../services/categoryService.js";
export const getListCategory = async (req, res, next) => {
  try {
    const category = await getListCategoryService();
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await createCategoryService({ name, description });
    res.status(201).json({ message: "Tạo category thành công", category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCategoryService(id);
    res.status(200).json({ message: "Xóa category thành công" });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await updateCategoryService({ id, name, description });
    res.status(200).json({ message: "Cập nhật category thành công", category });
  } catch (err) {
    next(err);
  }
};
