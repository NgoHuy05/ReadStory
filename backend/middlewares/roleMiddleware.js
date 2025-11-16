export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({ message: "Vui lòng đăng nhập" });
            }

            if (!requiredRoles.includes(user.role)) {
                    return res.status(403).json({ message: "Không đủ quyền truy cập" });
            }

            next();
        } catch (error) {
            console.error("Lỗi role middleware:", error);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
    };
};
