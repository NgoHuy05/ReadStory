import History from "../models/historyModel.js";
import { BadRequestError, NotFoundError } from "../utils/errors/index.js";

export const createHistoryService = async ({ userId, storyId, chapterId }) => {
  const exist = await History.findOne({ userId, storyId, chapterId });
  if (exist) throw new BadRequestError("Đã tồn tại history này");

  const history = await History.create({ userId, storyId, chapterId });
  return history;
};

export const deleteHistoryService = async ({ userId, storyId, chapterId }) => {
  const history = await History.findOneAndDelete({ userId, storyId, chapterId });
  if (!history) throw new NotFoundError("Lịch sử người dùng không tồn tại");

  return history;
};
