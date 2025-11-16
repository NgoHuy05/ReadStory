import Category from "../models/categoryModel.js";

export const getListCategory = async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json({ message: "Lấy danh sách category thành công", category });
    } catch (error) {
        console.error("Lỗi khi danh sách category", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        return res.status(200).json({ message: "Tạo category thành công", category });
    } catch (error) {
        console.error("Lỗi khi tạo category", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(400).json({ message: "Category không tồn tại" });
        }
        return res.status(200).json({ message: "Xóa category thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa category", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!name) return res.status(400).json({ message: "Tên category không được để trống" });

        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(400).json({ message: "Category không tồn tại" });
        }
        return res.status(200).json({ message: "Cập nhật category thành công" });
    } catch (error) {
        console.error("Lỗi khi cập nhật category", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

