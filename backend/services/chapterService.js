import Chapter from "../models/chapterModel.js";
import Story from "../models/storyModel.js";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";

export const getListChapterByStoryService = async (slugStory) => {
  const story = await Story.findOne({ slug: slugStory });
  if (!story) throw new NotFoundError("Story không tồn tại");

  const chapters = await Chapter.find({ storyId: story._id }).lean();
  if (chapters.length === 0) throw new NotFoundError("Không có chương nào");

  return chapters;
};

export const getDetailChapterService = async (slugChapter) => {
  const chapter = await Chapter.findOne({ slug: slugChapter });
  if (!chapter) throw new NotFoundError("Không tìm thấy chương");

  return chapter;
};

export const createChapterService = async (data) => {
  const { storyId, title, content, chapterNumber } = data;
  if (!storyId || !title || !content || !chapterNumber) {
    throw new BadRequestError("Chưa điền đầy đủ thông tin chương");
  }

  const chapter = await Chapter.create({
    storyId,
    title,
    content,
    chapterNumber,
    viewsNumber: 0,
    commentsNumber: 0,
  });

  return chapter;
};

export const deleteChapterService = async (id) => {
  const chapter = await Chapter.findByIdAndDelete(id);
  if (!chapter) throw new NotFoundError("Không tìm thấy chương");
  return chapter;
};
