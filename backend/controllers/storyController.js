import {
  getListStoryService,
  getListStoryHotService,
  getListStoryNewService,
  getListStorySortService,
  getListStoryRecommendService,
  getDetailStoryService,
  createStoryService,
  deleteStoryService,
  searchStoryService
} from "../services/storyService.js";

export const getListStory = async (req, res, next) => {
  try {
    const stories = await getListStoryService();
    res.status(200).json({ message: "Lấy danh sách truyện thành công", stories });
  } catch (err) {
    next(err);
  }
};

export const getListStoryHot = async (req, res, next) => {
  try {
    const stories = await getListStoryHotService();
    res.status(200).json({ message: "Lấy danh sách truyện hot thành công", stories });
  } catch (err) {
    next(err);
  }
};

export const getListStoryNew = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getListStoryNewService(page);
    res.status(200).json({ message: "Lấy danh sách truyện mới thành công", ...result });
  } catch (err) {
    next(err);
  }
};

export const getListStorySort = async (req, res, next) => {
  try {
    const { slugCategory } = req.params;
    const { sort, status, page } = req.query;
    const result = await getListStorySortService({ slugCategory, sort, status, page: parseInt(page) || 1 });
    res.status(200).json({ message: "Lấy danh sách truyện theo thể loại thành công", ...result });
  } catch (err) {
    next(err);
  }
};

export const getListStoryRecommend = async (req, res, next) => {
  try {
    const stories = await getListStoryRecommendService();
    res.status(200).json({ message: "Lấy danh sách truyện gợi ý thành công", stories });
  } catch (err) {
    next(err);
  }
};

export const getDetailStory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await getDetailStoryService(slug);
    res.status(200).json({ message: "Lấy chi tiết truyện thành công", ...result });
  } catch (err) {
    next(err);
  }
};

export const createStory = async (req, res, next) => {
  try {
    const story = await createStoryService({ userId: req.user._id, ...req.body, bannerImage: req.file?.path });
    res.status(201).json({ message: "Tạo truyện thành công", story });
  } catch (err) {
    next(err);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    await deleteStoryService(storyId);
    res.status(200).json({ message: "Xóa truyện thành công", storyId });
  } catch (err) {
    next(err);
  }
};

export const searchStory = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const stories = await searchStoryService(keyword);
    res.status(200).json({ data: stories });
  } catch (err) {
    next(err);
  }
};
