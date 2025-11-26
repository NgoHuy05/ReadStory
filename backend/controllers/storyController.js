import Category from "../models/categoryModel.js";
import Chapter from "../models/chapterModel.js";
import StoryCategory from "../models/storyCategoryModel.js";
import Story from "../models/storyModel.js";
import User from "../models/userModel.js";

export const getListStory = async (req, res) => {
    try {
        const stories = await Story.find().lean();
        if (stories.length === 0) {
            return res.status(404).json({ message: "Không có truyện nào" });
        }
        return res.status(200).json({ message: "Lấy danh sách truyện thành công", stories });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });

    }
}


export const getListStoryHot = async (req, res) => {
    try {
        const stories = await Story.find()
            .sort({ viewsCount: -1 })
            .limit(6)
            .lean();
        if (stories.length === 0) {
            return res.status(404).json({ message: "Không có truyện nào" });
        }
        return res.status(200).json({ message: "Lấy danh sách truyện thành công", stories });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });

    }
}
export const getListStoryNew = async (req, res) => {
    try {        
        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const skip = (page - 1) * limit;

        const [stories, totals] = await Promise.all([
            Story.find()
                .sort({ updatedAt: -1 })
                .limit(limit)
                .skip(skip)
                .lean(),
            Story.countDocuments()
        ])

        if (stories.length === 0) {
            return res.status(404).json({ message: "Không có truyện nào" });
        }
        return res.status(200).json({ message: "Lấy danh sách truyện thành công", stories, pagination: {
            page, limit, totals, totalsPage: Math.ceil(totals / limit)
        } });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });

    }
}
export const getListStorySort = async (req, res) => {
  try {
    const { slugCategory } = req.params;

    const category = await Category.findOne({ slug: slugCategory });
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy thể loại" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const sort = req.query.sort;
    const status = req.query.status;

    const storyCategory = await StoryCategory.find({ categoryId: category._id });

    const storyIds = storyCategory.map((item) => item.storyId);

    let sortRule = { updatedAt: -1 };
    if (sort === "follow") sortRule = { followsCount: -1 };
    if (sort === "view") sortRule = { viewsCount: -1 };
    if (sort === "new") sortRule = { createdAt: -1 };

    const filter = {
      _id: { $in: storyIds },
      ...(status && { status })
    };

    const [stories, totals] = await Promise.all([
      Story.find(filter)
        .sort(sortRule)
        .limit(limit)
        .skip(skip)
        .lean(),
      Story.countDocuments(filter)
    ]);

    return res.status(200).json({
      message: "Lấy danh sách truyện thành công",
      stories,
      category,
      pagination: {
        page,
        limit,
        totals,
        totalsPage: Math.max(1, Math.ceil(totals / limit)),
      },
    });

  } catch (error) {
    console.error("Lỗi khi lấy danh sách truyện", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};


export const getListStoryRecommend = async (req, res) => {
    try {
        const stories = await Story.find()
            .sort({ followsCount: -1 })
            .limit(10)
            .lean();
        if (stories.length === 0) {
            return res.status(404).json({ message: "Không có truyện nào" });
        }
        return res.status(200).json({ message: "Lấy danh sách truyện thành công", stories });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });

    }
}

export const getDetailStory = async (req, res) => {
    try {
        const { slug } = req.params;

        const story = await Story.findOne({ slug });
        if (!story) {
            return res.status(400).json({ message: "Không tìm thấy truyện" });
        }

        const chapters = await Chapter.find({ storyId: story._id })
            .sort({ chapterNumber: 1 });

        return res.status(200).json({
            message: "Lấy chi tiết truyện thành công",
            story,
            chapters
        });
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


export const createStory = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: "Chưa đăng nhập" });
        }

        const { title, description, status } = req.body;

        const exist = await Story.findOne({ title });
        if (exist) {
            return res.status(400).json({ message: "Tên truyện đã tồn tại" });
        }

        const user = await User.findById(req.user._id).select("displayName");

        const story = await Story.create({
            title,
            description,
            author: user.displayName,
            status,
            viewsCount: 0,
            followsCount: 0,
            totalChapters: 0,
        });

        return res.status(200).json({ message: "Tạo truyện thành công", story });
    } catch (error) {
        console.error("Lỗi khi tạo truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


export const deleteStory = async (req, res) => {
    try {
        const { id } = req.body;
        const story = await Story.findByIdAndDelete(id);
        if (!story) {
            return res.status(404).json({ message: "Không tìm thấy truyện" })
        }
        return res.status(200).json({ message: "Xóa truyện thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa truyện", error);
        return res.status(500).json({ message: "Lỗi hệ thống" })
    }
}

export const searchStory = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";

    if (!keyword) {
      return res.json({ data: [] }); // frontend luôn nhận `data`
    }

    const stories = await Story.find({
      title: { $regex: keyword, $options: "i" }
    })
      .limit(10)
      .lean();

    return res.json({ data: stories });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm truyện", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
