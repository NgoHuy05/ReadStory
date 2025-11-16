import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const id = req.user._id;
        if (!id) {
            return res.status(400).json({ message: "Vui lòng đăng nhập" })
        }
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại" })
        }

        return res.status(200).json({ message: "Lấy thông tin người dùng thành công", user });
    } catch (error) {
        console.error("Lỗi lấy thông tin cá nhân");
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const getListUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (users.length === 0) {
            return res.status(400).json({ message: "Người dùng không tồn tại" })
        }

        return res.status(200).json({ message: "Lấy danh sách người dùng thành công", users });
    } catch (error) {
        console.error("Lỗi lấy danh sách người dùng");
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const { displayName, fullName } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Vui lòng đăng nhập" })
        }

        const user = await User.findByIdAndUpdate(id, {
                displayName,
                fullName
            }, { new: true }
        ).select("-password");

        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại", user })
        }

        return res.status(200).json({ message: "Cập nhật thông tin người dùng thành công" });
    } catch (error) {
        console.error("Lỗi cập nhật thông tin người dùng");
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).json({ message: "Người dùng không tồn tại" });
        }

        return res.status(200).json({ message: "Xoá người dùng thành công" });
    } catch (error) {
        console.error("Lỗi xóa người dùng");
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}