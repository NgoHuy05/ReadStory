import Bookmark from "../models/bookmarkModel.js";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors/index.js";

export const createBookmarkService = async ({ userId, storyId }) => {
  if (!storyId) {
    throw new BadRequestError("Thiếu storyId");
  }

  const existing = await Bookmark.findOne({ userId, storyId });
  if (existing) {
    throw new ConflictError("Bookmark đã tồn tại");
  }

  const bookmark = await Bookmark.create({ userId, storyId });
  return bookmark;
};

export const deleteBookmarkService = async ({ userId, storyId }) => {
  if (!storyId) {
    throw new BadRequestError("Thiếu storyId");
  }

  const bookmark = await Bookmark.findOneAndDelete({ userId, storyId });
  if (!bookmark) {
    throw new NotFoundError("Bookmark không tồn tại hoặc không thuộc về bạn");
  }
};
