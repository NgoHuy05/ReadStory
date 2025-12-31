import {
  getListChapterByStoryService,
  getDetailChapterService,
  createChapterService,
  deleteChapterService,
} from "../services/chapterService.js";

export const getListChapterByStory = async (req, res, next) => {
  try {
    const slugStory = req.params.slugStory;
    const chapters = await getListChapterByStoryService(slugStory);
    return res.status(200).json({
      message: "Lấy danh sách chương thành công",
      chapters,
    });
  } catch (err) {
    next(err);
  }
};

export const getDetailChapter = async (req, res, next) => {
  try {
    const slugChapter = req.params.slugChapter;
    const chapter = await getDetailChapterService(slugChapter);
    return res.status(200).json({
      message: "Lấy chi tiết chương thành công",
      chapter,
    });
  } catch (err) {
    next(err);
  }
};

export const createChapter = async (req, res, next) => {
  try {
    const {storyId, title, content, chapterNumber} = req.body;
    const chapter = await createChapterService({storyId, title, content, chapterNumber});
    return res.status(201).json({
      message: "Tạo chương thành công",
      chapter,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteChapter = async (req, res, next) => {
  try {
    const {chapterId} = req.params;
    await deleteChapterService(chapterId);
    return res.status(200).json({ message: "Xóa chương thành công" });
  } catch (err) {
    next(err);
  }
};
