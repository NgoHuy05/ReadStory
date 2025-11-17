import Story from "../models/storyModel.js";
import User from "../models/userModel.js";

export const getListStory = async (req, res) => {
    try {
        const storys = await Story.find().lean();
        if (storys.length === 0) {
            return res.status(404).json({ message: "Không có truyện nào" });
        }
        return res.status(200).json({ message: "Lấy danh sách truyện thành công", storys });
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
            return res.status(400).json({ message: "Không tìm thấy truyện" })
        }
        return res.status(200).json({ message: "Lấy chi tiết truyện thành công", story });
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết truyện");
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

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

