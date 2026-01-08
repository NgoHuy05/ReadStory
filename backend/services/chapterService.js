import Chapter from "../models/chapterModel.js";
import Story from "../models/storyModel.js";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";


export const getDetailChapterService = async (slugChapter) => {
  const chapter = await Chapter.findOne({ slug: slugChapter })
  .populate("storyId")
  .lean();
  if (!chapter) throw new NotFoundError("Không tìm thấy chương");


  return chapter;
};

export const createChapterService = async ({storyId, title, content, chapterNumber}) => {
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
