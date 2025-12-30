import {
  getListCommentByChapterService,
  getListCommentByStoryService,
  createCommentService,
  deleteCommentService,
} from "../services/commentService.js";

export const getListCommentByChapter = async (req, res, next) => {
  try {
    const comments = await getListCommentByChapterService(req.params.slugChapter);
    return res.status(200).json({ message: "Lấy danh sách bình luận theo chương thành công", comments });
  } catch (err) {
    next(err);
  }
};

export const getListCommentByStory = async (req, res, next) => {
  try {
    const comments = await getListCommentByStoryService(req.params.slugStory);
    return res.status(200).json({ message: "Lấy danh sách bình luận theo truyện thành công", comments });
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = await createCommentService({ userId: req.user._id, ...req.body });
    return res.status(201).json({ message: "Tạo comment thành công", comment });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await deleteCommentService(req.user._id, req.params.commentId);
    return res.status(200).json({ message: "Xóa comment thành công" });
  } catch (err) {
    next(err);
  }
};
