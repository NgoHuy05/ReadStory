import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
    try {
        const {username, email, password, fullName} = req.body;
        // chuẩn hóa dữ liệu
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({message: "Chưa điền đầy đủ thông tin"});
        }
        // kiểm tra người dùng tồn tại
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        });
        if (existingUser) {
            return res.status(400).json({message: "Email hoặc username đã tồn tại"});
        }

        // mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(password, 10);

        // lưu vào database
        await User.create({
            username,
            email,
            password: hashPassword,
            fullName,
            displayName: fullName
        });

        return res.status(200).json({message: "Đăng kí thành công"});
    } catch (error) {
        console.error("Lỗi signUp");
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
};



export const SignIn = (req, res) => {
    try {
        // Sign in logic here
        const { email, password } = req.body;
        // Authenticate user
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



