import { createHistoryService, deleteHistoryService } from "../services/historyService.js";

export const createHistory = async (req, res, next) => {
  try {
    const history = await createHistoryService({
      userId: req.user._id,
      storyId: req.body.storyId,
      chapterId: req.body.chapterId
    });
    res.status(201).json({ message: "Tạo lịch sử thành công", history });
  } catch (err) {
    next(err);
  }
};

export const deleteHistory = async (req, res, next) => {
  try {
    const history = await deleteHistoryService({
      userId: req.user._id,
      storyId: req.params.storyId,
      chapterId: req.params.chapterId
    });
    res.status(200).json({
      message: "Xóa lịch sử thành công",
      historyId: history._id
    });
  } catch (err) {
    next(err);
  }
};
