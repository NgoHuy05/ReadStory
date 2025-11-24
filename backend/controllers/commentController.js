import Comment from "../models/commentModel.js";
import Chapter from "../models/chapterModel.js";
import Story from "../models/storyModel.js";

export const getListCommentByChapter = async (req, res) => {
  try {
    const { slugChapter } = req.params;
    const chapter = await Chapter.findOne({ slug: slugChapter });
    if (!chapter) return res.status(404).json({ message: "Chương không tồn tại" });

    const comments = await Comment.find({ chapterId: chapter._id }).populate("userId", "displayName avtUrl").lean();
    return res.status(200).json({ message: "Lấy danh sách bình luận theo chương thành công", comments });
  } catch (error) {
    console.error("Lỗi khi lấy bình luận chương", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getListCommentByStory = async (req, res) => {
  try {
    const { slugStory } = req.params;
    const story = await Story.findOne({ slug: slugStory });
    if (!story) return res.status(404).json({ message: "Truyện không tồn tại" });

    const comments = await Comment.find({ storyId: story._id }).populate("userId", "displayName avtUrl").lean();
    return res.status(200).json({ message: "Lấy danh sách bình luận theo truyện thành công", comments });
  } catch (error) {
    console.error("Lỗi khi lấy bình luận truyện", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createComment = async (req, res) => {
  try {
    const id = req.user._id;
    const { storyId, chapterId, content } = req.body;

    const comment = await Comment.create({
      userId: id,
      storyId,
      chapterId: chapterId || null,
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
      return res.status(404).json({ message: "Comment không tồn tại hoặc không thuộc về bạn" });
    }

    return res.status(200).json({ message: "Xóa comment thành công", comment });
  } catch (error) {
    console.error("Lỗi khi xóa comment", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
