import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-white py-10 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl bg-[var(--footer-bg)] font-bold mb-3">Truyện Hay</h2>
          <p className="text-white/80 leading-relaxed">
            Nền tảng đọc truyện online miễn phí, cập nhật nhanh – trải nghiệm mượt mà.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Thông tin</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-white cursor-pointer transition">
              <Link to="/about">Giới thiệu </Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link to="/privacy">Chính sách bảo mật</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link to="/terms">Điều khoản sử dụng</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link to="/contact">Liên hệ</Link>
              </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Kết nối</h3>
          <ul className="space-y-2 text-white/80">
            <li className="hover:text-white cursor-pointer transition"> 
              <Link to="https://www.facebook.com/profile.php?id=61579054337647">Facebook</Link>
              </li>
            <li className="hover:text-white cursor-pointer transition">Email</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-white/70 text-sm">
        © 2025 TruyenHay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
