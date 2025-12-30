import {
  getListChapterByStoryService,
  getDetailChapterService,
  createChapterService,
  deleteChapterService,
} from "../services/chapterService.js";

export const getListChapterByStory = async (req, res, next) => {
  try {
    const chapters = await getListChapterByStoryService(req.params.slugStory);
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
    const chapter = await getDetailChapterService(req.params.slugChapter);
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
    const chapter = await createChapterService(req.body);
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
