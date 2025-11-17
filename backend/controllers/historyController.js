import History from "../models/historyModel.js";

export const createHistory = async (req, res) => {
    try {
        const id = req.user._id;
        const { storyId, chapterId } = req.body;

        const exist = await History.findOne({
            userId: id,
            storyId,
            chapterId
        })
        if (exist) {
            return res.status(400).json({message: "Đã tồn tại history này"})
        }
        const history = await History.create({
            userId: id,
            storyId,
            chapterId
        })
        return res.status(200).json({message: "Tạo lịch sử thành công", history});
    } catch (error) {
        console.error("Lỗi khi tạo lịch sử", error);
        return res.status(500).json({ message: "Lỗi hệ thống" })
    }
}
export const deleteHistory = async (req, res) => {
    try {
        const id = req.user._id;
        const { storyId, chapterId } = req.body;
        const history = await History.findOneAndDelete({
            userId: id,
            storyId,
            chapterId
        })
        if (!history) {
            return res.status(400).json({message: "Lịch sử người dùng không tồn tại"});
        }
        return res.status(200).json({message: "Xóa lịch sử thành công"});
    } catch (error) {
        console.error("Lỗi khi tạo lịch sử", error);
        return res.status(500).json({ message: "Lỗi hệ thống" })
    }
}