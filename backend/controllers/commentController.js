import Comment from "../models/commentModel.js";

export const createComment = async (req, res) => {
    try {
        const id = req.user._id;
        const { storyId, chapterId, content } = req.body;

        const comment = await Comment.create({
            userId: id,
            storyId,
            chapterId,
            content
        });

        return res.status(200).json({ message: "Tạo comment thành công", comment });
    } catch (error) {
        console.error("Lỗi khi tạo comment", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const id = req.user._id;
        const { commentId } = req.body;

        const comment = await Comment.findOneAndDelete({
            _id: commentId,
            userId: id 
        });

        if (!comment) {
            return res.status(404).json({ message: "comment không tồn tại hoặc không thuộc về bạn" });
        }

        return res.status(200).json({ message: "Xóa comment thành công", comment });
    } catch (error) {
        console.error("Lỗi khi xóa comment", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
