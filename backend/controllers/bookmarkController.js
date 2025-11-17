import Bookmark from "../models/bookmarkModel.js";

export const createBookmark = async (req, res) => {
    try {
        const id = req.user._id;
        const { storyId } = req.body;

        const exist = await Bookmark.findOne({ userId: id, storyId });
        if (exist) {
            return res.status(400).json({ message: "Bookmark đã tồn tại" });
        }

        const bookmark = await Bookmark.create({ userId: id, storyId });

        return res.status(201).json({ message: "Tạo bookmark thành công", bookmark });
    } catch (error) {
        console.error("Lỗi khi tạo bookmark", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


export const deleteBookmark = async (req, res) => {
    try {
        const id = req.user._id;
        const { storyId } = req.body;

        const bookmark = await Bookmark.findOneAndDelete({ userId: id, storyId });

        if (!bookmark) {
            return res.status(404).json({ message: "Bookmark không tồn tại hoặc không thuộc về bạn" });
        }

        return res.status(200).json({ message: "Xóa bookmark thành công", bookmark });
    } catch (error) {
        console.error("Lỗi khi xóa bookmark", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
