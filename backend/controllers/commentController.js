import {
  getListCommentByChapterService,
  getListCommentByStoryService,
  createCommentService,
  deleteCommentService,
} from "../services/commentService.js";

export const getListCommentByChapter = async (req, res, next) => {
  try {
    const slugChapter = req.params.slugChapter;
    const comments = await getListCommentByChapterService(slugChapter);
    return res.status(200).json({ message: "Lấy danh sách bình luận theo chương thành công", comments });
  } catch (err) {
    next(err);
  }
};

export const getListCommentByStory = async (req, res, next) => {
  try {
    const slugStory = req.params.slugStory;
    const comments = await getListCommentByStoryService(slugStory);
    return res.status(200).json({ message: "Lấy danh sách bình luận theo truyện thành công", comments });
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { storyId, chapterId = null, content } = req.body;
    const comment = await createCommentService({ userId, storyId, chapterId, content });
    return res.status(201).json({ message: "Tạo comment thành công", comment });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const commentId = req.params.commentId;
    await deleteCommentService(userId, commentId);
    return res.status(200).json({ message: "Xóa comment thành công" });
  } catch (err) {
    next(err);
  }
};
