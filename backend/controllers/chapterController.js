import Chapter from "../models/chapterModel.js";
import Story from "../models/storyModel.js";

export const getListChapterByStory = async (req, res) => {
    try {
        const { slugStory } = req.params;

        const story = await Story.findOne({ slug: slugStory });
        if (!story) {
            return res.status(404).json({ message: "Story không tồn tại" });
        }

        const chapters = await Chapter.find({ storyId: story._id }).lean();
        if (chapters.length === 0) {
            return res.status(404).json({ message: "Không có chương nào" });
        }

        return res.status(200).json({
            message: "Lấy danh sách chương thành công",
            chapters
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách chương", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
export const getDetailChapter = async (req, res) => {
    try {
        const { slugChapter } = req.params;

        const chapter = await Chapter.findOne({ slug: slugChapter });
        if (!chapter) {
            return res.status(404).json({ message: "Không tìm thấy chương" });
        }

        return res.status(200).json({
            message: "Lấy chi tiết chương thành công",
            chapter
        });
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết chương", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const createChapter = async (req, res) => {
    try {
        const { storyId, title, content, chapterNumber } = req.body;

        const chapter = await Chapter.create({
            storyId,
            title,
            content,
            chapterNumber,
            viewsNumber: 0,
            commentsNumber: 0,
        });

        return res.status(201).json({
            message: "Tạo chương thành công",
            chapter
        });
    } catch (error) {
        console.error("Lỗi khi tạo chương", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const deleteChapter = async (req, res) => {
    try {
        const { id } = req.params;

        const chapter = await Chapter.findByIdAndDelete(id);
        if (!chapter) {
            return res.status(404).json({ message: "Không tìm thấy chương" });
        }

        return res.status(200).json({ message: "Xóa chương thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa chương", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
