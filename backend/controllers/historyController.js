import { createHistoryService, deleteHistoryService } from "../services/historyService.js";

export const createHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {storyId, chapterId} = req.body;
    const history = await createHistoryService({
      userId,
      storyId,
      chapterId
    });
    res.status(201).json({ message: "Tạo lịch sử thành công", history });
  } catch (err) {
    next(err);
  }
};

export const deleteHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {storyId, chapterId} = req.params;
    const history = await deleteHistoryService({
      userId,
      storyId,
      chapterId
    });
    res.status(200).json({
      message: "Xóa lịch sử thành công",
      historyId: history._id
    });
  } catch (err) {
    next(err);
  }
};
