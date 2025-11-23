import StoryCategory from "../models/storyCategoryModel.js";

export const getListStoryCategory = async (req, res) => {
    try {
        const storyCategory = await StoryCategory.find().lean();
        return res.status(200).json({ message: "Lấy danh sách storyCategory thành công", storyCategory })
    } catch (error) {
        console.error("Lỗi khi tạo storyCategory", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const createStoryCategory = async (req, res) => {
    try {
        const { storyId, categoryId } = req.body;
        const exist = await StoryCategory.findOne({ storyId, categoryId });
        if (exist) {
            return res.status(400).json({ message: "Đã tồn tại storyCategory này" });
        }
        const storyCategory = await StoryCategory.create({
            storyId,
            categoryId
        });

        return res.status(200).json({ message: "Tạo storyCategory thành công", storyCategory })
    } catch (error) {
        console.error("Lỗi khi tạo storyCategory", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const deleteStoryCategory = async (req, res) => {
    try {
        const { storyId, categoryId } = req.body;
        const storyCategory = await StoryCategory.findOneAndDelete({
            storyId,
            categoryId
        });

        if (!storyCategory) {
            return res.status(404).json({ message: "storyCategory không tồn tại hoặc đã bị xóa" })
        }
        return res.status(200).json({ message: "Xóa storyCategory thành công", storyCategory })
    } catch (error) {
        console.error("Lỗi khi xóa storyCategory", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

