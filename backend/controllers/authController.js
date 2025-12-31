
import { getProfileService, RefreshTokenService, SignInService, SignOutService, SignUpService } from "../services/authService.js";

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const SignUp = async (req, res, next) => {
    try {
        const {username, fullname, email, password, repassword} = req.body;
        await SignUpService({username, fullname, email, password, repassword});
        res.status(200).json({ message: "Đăng kí thành công" });
    } catch (err) {
        next(err);
    }
};

export const SignIn = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const { user, accessToken, refreshToken } = await SignInService({username, password});
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', maxAge: ACCESS_TOKEN_MAX_AGE });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: REFRESH_TOKEN_TTL });
        
        res.status(200).json({
            message: `User ${user.displayName} đã đăng nhập thành công`,
            user: {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                displayName: user.displayName
            }
        });
    } catch (err) {
        next(err);
    }
};

export const SignOut = async (req, res, next) => {
    try {
        const token = req?.cookies.refreshToken;
        await SignOutService(token);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Đã đăng xuất" });
    } catch (err) {
        next(err);
    }
};

export const RefreshToken = async (req, res, next) => {
    try {
        const { refreshToken, accessToken } = await RefreshTokenService(req?.cookies.refreshToken);

        res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax", maxAge: ACCESS_TOKEN_MAX_AGE });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax", maxAge: REFRESH_TOKEN_TTL });

        res.status(200).json({ message: "Refreshed" });
    } catch (err) {
        next(err);
    }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const user = await getProfileService(userId);
    res.status(200).json({ message: "Lấy thông tin người dùng thành công", user });
  } catch (err) {
    next(err);
  }
};