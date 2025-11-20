import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/sessionModel.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

export const SignUp = async (req, res) => {
    try {
        const { username, fullname, email, password, repassword } = req.body;
        // chuẩn hóa dữ liệu
        if (!username || !email || !password || !fullname) {
            return res.status(400).json({ message: "Chưa điền đầy đủ thông tin" });
        }

        if (password !== repassword) {
            return res.status(400).json({ message: "Mật khẩu không trùng nhau" });
        }
        const emailNormalized = email.toLowerCase();

        // kiểm tra người dùng tồn tại
        const existingUser = await User.findOne({
            $or: [{ email: emailNormalized }, { username }]
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email hoặc username đã tồn tại" });
        }

        // mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(password, 10);

        // lưu vào database
        await User.create({
            username,
            fullname,
            email,
            password: hashPassword,
            displayName: fullname
        });

        return res.status(200).json({ message: "Đăng kí thành công" });
    } catch (error) {
        console.error("Lỗi signUp");
        return res.status(500).json({ message: "Lỗi hệ thống" })
    }
};



export const SignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        // chuẩn hóa dữ liệu
        if (!username || !password) {
            return res.status(400).json({ message: "Chưa nhập đầy đủ thông tin" })
        }

        // kiểm tra người dùng có tồn tại hay không
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Username hoặc password chưa chính xác" });
        }

        // kiểm tra mật khẩu
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({ message: "Username hoặc password chưa chính xác" });
        }

        // tạo accessToken
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });

        // tạo refreshToken
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // lưu refreshToken vào database
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        });

        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     sameSite: 'none',
        //     secure: true,
        //     maxAge: REFRESH_TOKEN_TTL
        // });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax', // 'lax' để dev localhost gửi cookie
            // secure: false, // bỏ secure khi dev HTTP
            maxAge: REFRESH_TOKEN_TTL
        });

        // trả accessToken về cho client 
        return res.status(200).json({ message: `User ${user.displayName} đã đăng nhập thành công`, accessToken })
    } catch (error) {
        console.error("Lỗi đăng nhập");
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const SignOut = async (req, res) => {
    try {
        // lấy token trong cookie 
        const token = req?.cookies.refreshToken;
        if (token) {
            // xoá trong database
            await Session.deleteOne({ refreshToken: token });
            // xóa trong phiên đăng nhập
            res.clearCookie("refreshToken");
        }
        res.status(200).json({ message: "Đã đăng xuất" });
    } catch {
        console.error("Lỗi đăng xuất");
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const RefreshToken = async (req, res) => {
    try {
        // lấy token trong cookie
        const token = req?.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Không có token" });
        }


        // kiểm tra token trong database
        const session = await Session.findOne({ refreshToken: token });
        if (!session) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        if (session.expiresAt < new Date()) {
            return res.status(401).json({ message: "Token hết hạn" });
        }

        // tạo accessToken mới
        const accessToken = jwt.sign({ userId: session.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });

        // trả accessToken về cho client 
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Lỗi làm mới token");
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}