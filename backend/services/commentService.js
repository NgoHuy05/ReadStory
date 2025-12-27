import Comment from "../models/commentModel.js";
import Chapter from "../models/chapterModel.js";
import Story from "../models/storyModel.js";
import { NotFoundError } from "../utils/errors/index.js";

export const getListCommentByChapterService = async (slugChapter) => {
  const chapter = await Chapter.findOne({ slug: slugChapter });
  if (!chapter) throw new NotFoundError("Chương không tồn tại");

  const comments = await Comment.find({ chapterId: chapter._id })
    .populate("userId", "displayName avtUrl")
    .lean();

  return comments;
};

export const getListCommentByStoryService = async (slugStory) => {
  const story = await Story.findOne({ slug: slugStory });
  if (!story) throw new NotFoundError("Truyện không tồn tại");

  const comments = await Comment.find({ storyId: story._id })
    .populate("userId", "displayName avtUrl")
    .lean();

  return comments;
};

export const createCommentService = async (data) => {
  const { userId, storyId, chapterId = null, content } = data;
  const comment = await Comment.create({ userId, storyId, chapterId, content });
  return comment;
};

export const deleteCommentService = async (userId, commentId) => {
  const comment = await Comment.findOneAndDelete({ _id: commentId, userId });
  if (!comment) throw new NotFoundError("Comment không tồn tại hoặc không thuộc về bạn");
  return comment;
};
