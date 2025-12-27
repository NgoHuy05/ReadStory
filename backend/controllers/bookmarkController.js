import { createBookmarkService, deleteBookmarkService } from "../services/bookmarkService.js";

export const createBookmark = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { storyId } = req.body;
        const { bookmark } = await createBookmarkService({ userId, storyId });
        res.status(201).json({ message: "Tạo bookmark thành công", bookmark });
    } catch (err) {
        next(err);
    }
};

export const deleteBookmark = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { storyId } = req.body;
        await deleteBookmarkService({ userId, storyId });
        res.status(200).json({ message: "Xóa bookmark thành công" });
    } catch (err) {
        next(err);
    }
};
