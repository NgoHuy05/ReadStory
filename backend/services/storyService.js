import Story from "../models/storyModel.js";
import Chapter from "../models/chapterModel.js";
import Category from "../models/categoryModel.js";
import StoryCategory from "../models/storyCategoryModel.js";
import User from "../models/userModel.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/errors/index.js";

export const getListStoryService = async () => {
  const stories = await Story.find().lean();
  if (!stories.length) throw new NotFoundError("Không có truyện nào");
  return stories;
};

export const getListStoryHotService = async () => {
  const stories = await Story.find().sort({ viewsCount: -1 }).limit(6).lean();
  if (!stories.length) throw new NotFoundError("Không có truyện nào");
  return stories;
};

export const getListStoryNewService = async (page = 1, limit = 12) => {
  const skip = (page - 1) * limit;
  const [stories, totals] = await Promise.all([
    Story.find().sort({ updatedAt: -1 }).limit(limit).skip(skip).lean(),
    Story.countDocuments()
  ]);
  if (!stories.length) throw new NotFoundError("Không có truyện nào");
  return { stories, pagination: { page, limit, totals, totalsPage: Math.ceil(totals / limit) } };
};

export const getListStorySortService = async ({ slugCategory, sort, status, page = 1, limit = 12 }) => {
  const category = await Category.findOne({ slug: slugCategory });
  if (!category) throw new NotFoundError("Không tìm thấy thể loại");

  const storyCategory = await StoryCategory.find({ categoryId: category._id });
  const storyIds = storyCategory.map((item) => item.storyId);

  let sortRule = { updatedAt: -1 };
  if (sort === "follow") sortRule = { followsCount: -1 };
  if (sort === "view") sortRule = { viewsCount: -1 };
  if (sort === "new") sortRule = { createdAt: -1 };

  const filter = { _id: { $in: storyIds }, ...(status && { status }) };
  const skip = (page - 1) * limit;
  const [stories, totals] = await Promise.all([
    Story.find(filter).sort(sortRule).limit(limit).skip(skip).lean(),
    Story.countDocuments(filter)
  ]);

  return { stories, category, pagination: { page, limit, totals, totalsPage: Math.max(1, Math.ceil(totals / limit)) } };
};

export const getListStoryRecommendService = async () => {
  const stories = await Story.find().sort({ followsCount: -1 }).limit(10).lean();
  if (!stories.length) throw new NotFoundError("Không có truyện nào");
  return stories;
};

export const getDetailStoryService = async (slug) => {
  const story = await Story.findOne({ slug }).lean();
  if (!story) throw new NotFoundError("Không tìm thấy truyện");

  const chapters = await Chapter.find({ storyId: story._id }).sort({ chapterNumber: 1 }).lean();
return { story: { ...story, chapters } };
};

export const createStoryService = async ({ userId, title, description, status, bannerImage }) => {
  if (!userId) throw new UnauthorizedError("Chưa đăng nhập");

  const exist = await Story.findOne({ title });
  if (exist) throw new BadRequestError("Tên truyện đã tồn tại");

  const user = await User.findById(userId).select("displayName");

  const story = await Story.create({
    title,
    description,
    author: user.displayName,
    status,
    bannerImage: bannerImage || null,
    viewsCount: 0,
    followsCount: 0,
    totalChapters: 0,
  });

  return story;
};

export const deleteStoryService = async (id) => {
  const story = await Story.findByIdAndDelete(id);
  if (!story) throw new NotFoundError("Không tìm thấy truyện");
  return story;
};

export const searchStoryService = async (keyword) => {
  if (!keyword?.trim()) return [];
  const stories = await Story.find({ title: { $regex: keyword, $options: "i" } })
    .limit(10)
    .lean();
  return stories;
};
