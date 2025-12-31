const About = () => {
  return (
    <main>
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          [ Truyện Hay] — Cổng đọc truyện trực tuyến
        </h1>
        <p className="text-sm md:text-base ">
          Kho truyện đa thể loại, giao diện tối ưu cho người đọc và tác giả.
        </p>
      </header>
      <section
        id="about"
        className="max-w-4xl mx-auto rounded-2xl shadow-sm p-6 md:p-10 mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
        <p className="mb-4 leading-relaxed">
          Chào mừng bạn đến với <strong>[Truyện Hay]</strong> — nền tảng đọc
          truyện trực tuyến được phát triển với mục tiêu mang đến trải nghiệm
          đọc mượt mà, trực quan và hiện đại. Chúng tôi hiểu rằng mỗi độc giả
          đều có cách thưởng thức văn chương riêng, vì vậy [Truyện Hay] được xây
          dựng dựa trên sự linh hoạt, tốc độ và khả năng cá nhân hóa cao.
        </p>

        <p className="mb-4 leading-relaxed">
          Không chỉ đơn thuần là một website đọc truyện, [Truyện Hay] còn là một
          không gian để kết nối độc giả, tác giả và những người yêu thích sáng
          tác. Tại đây, mỗi câu chuyện đều có cơ hội được lan tỏa, mỗi tác giả
          đều có cơ hội được lắng nghe và trưởng thành cùng cộng đồng.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">
          Những gì chúng tôi cung cấp
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Kho truyện đa dạng: ngôn tình, kiếm hiệp, tiên hiệp, kỳ ảo, đô thị,
            lịch sử, viễn tưởng, trinh thám, fanfic và nhiều thể loại khác.
          </li>
          <li>
            Giao diện đọc tối ưu: tùy chỉnh cỡ chữ, màu nền, khoảng dòng; chế độ
            sáng/tối; lưu vị trí đọc tự động giữa các thiết bị.
          </li>
          <li>
            Công cụ cho tác giả: đăng truyện nhanh, quản lý chương trực quan,
            công cụ SEO cơ bản và thống kê lượng đọc chi tiết.
          </li>
          <li>
            Trang profile tác giả & độc giả: theo dõi, đánh giá, bình luận
            chương, theo dõi tiến độ cập nhật truyện.
          </li>
          <li>
            Hệ thống đề xuất thông minh dựa trên lịch sử đọc và sở thích của
            từng người dùng.
          </li>
          <li>
            Tính năng bookmark, danh sách yêu thích, lịch sử đọc đồng bộ trên
            mọi thiết bị.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">Tầm nhìn & Giá trị</h3>
        <p className="leading-relaxed mb-4">
          [Truyện Hay] hướng đến việc xây dựng một hệ sinh thái nội dung lành
          mạnh, bền vững và tôn trọng bản quyền. Chúng tôi mong muốn tạo ra môi
          trường để tác giả có thể tập trung sáng tác, còn độc giả có thể thưởng
          thức truyện một cách thoải mái, không bị làm phiền bởi quảng cáo gây
          khó chịu.
        </p>

        <p className="leading-relaxed">
          Với định hướng dài hạn, chúng tôi kỳ vọng sẽ trở thành nền tảng đọc
          truyện chất lượng cao, hỗ trợ nhiều tính năng mạnh mẽ như hệ thống xếp
          hạng, phân tích dữ liệu, gợi ý theo hành vi đọc, tối ưu SEO cho tác
          giả, và mở rộng cộng đồng yêu văn chương Việt Nam. Mỗi phản hồi của
          người dùng đều là động lực để chúng tôi cải thiện và phát triển từng
          ngày.
        </p>
      </section>
    </main>
  );
};
export default About;