const PrivatePolicy = () => {
  return (
    <section id="privacy" className="max-w-4xl mx-auto rounded-2xl p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-bold mb-4">Chính sách bảo mật</h2>
      
      <p className="mb-4 leading-relaxed">
        Quyền riêng tư của bạn rất quan trọng với chúng tôi. Nội dung dưới đây giải thích cách <strong>[Tên Website]</strong> 
        thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân khi bạn truy cập và sử dụng dịch vụ. Chúng tôi cam kết minh bạch 
        và tôn trọng quyền riêng tư của mỗi người dùng.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">1. Thông tin chúng tôi thu thập</h3>
      <p className="leading-relaxed mb-3">
        Khi bạn sử dụng dịch vụ, chúng tôi có thể thu thập một số loại thông tin như sau:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Thông tin đăng ký:</strong> email, tên hiển thị, thông tin hồ sơ nếu bạn tạo tài khoản.</li>
        <li><strong>Dữ liệu hoạt động:</strong> các truyện đã đọc, chương đã lưu, lượt thích, bình luận, danh sách yêu thích.</li>
        <li><strong>Dữ liệu kỹ thuật:</strong> địa chỉ IP, loại trình duyệt, thông tin thiết bị, cookie, dữ liệu phân tích để cải thiện dịch vụ và trải nghiệm người dùng.</li>
        <li><strong>Thông tin tùy chọn:</strong> các khảo sát, biểu mẫu hoặc thông tin bạn cung cấp khi liên hệ hoặc gửi phản hồi.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">2. Mục đích sử dụng thông tin</h3>
      <p className="leading-relaxed mb-3">
        Chúng tôi sử dụng dữ liệu thu thập được cho các mục đích sau:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Cung cấp, duy trì và cải thiện dịch vụ, bao gồm lưu vị trí đọc, tiến trình và thiết lập cá nhân hóa.</li>
        <li>Cá nhân hóa gợi ý truyện, danh sách đề xuất dựa trên sở thích và thói quen đọc.</li>
        <li>Gửi thông báo quan trọng, cập nhật dịch vụ, thông tin bảo mật hoặc hỗ trợ kỹ thuật.</li>
        <li>Phân tích hành vi sử dụng để phát triển tính năng mới, nâng cao trải nghiệm và khắc phục sự cố.</li>
        <li>Thực hiện nghiên cứu nội bộ, khảo sát người dùng (nếu bạn đồng ý), phục vụ việc cải thiện dịch vụ.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">3. Chia sẻ & bảo vệ thông tin</h3>
      <p className="leading-relaxed mb-3">
        Chúng tôi cam kết không bán thông tin cá nhân cho bên thứ ba. Chỉ trong các trường hợp sau, thông tin có thể được chia sẻ:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Khi có yêu cầu hợp pháp từ cơ quan nhà nước hoặc theo quy định của pháp luật.</li>
        <li>Với nhà cung cấp dịch vụ hỗ trợ vận hành nền tảng (nhà lưu trữ dữ liệu, dịch vụ gửi email, công cụ phân tích) – trong giới hạn cần thiết và theo hợp đồng bảo mật.</li>
        <li>Khi hợp tác với đối tác để cải thiện trải nghiệm người dùng (ví dụ thông báo sự kiện, cập nhật nội dung), chỉ khi bạn đồng ý.</li>
      </ul>

      <p className="mt-4 leading-relaxed">
        Để bảo mật thông tin, chúng tôi sử dụng mã hóa dữ liệu nhạy cảm, kiểm soát truy cập nội bộ, giám sát các hoạt động bất thường và sao lưu dữ liệu định kỳ. 
        Chúng tôi liên tục cập nhật biện pháp bảo mật để giảm thiểu rủi ro rò rỉ thông tin.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">4. Quyền của bạn</h3>
      <p className="leading-relaxed mb-3">
        Bạn có quyền:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Yêu cầu truy cập dữ liệu cá nhân mà chúng tôi đang lưu trữ.</li>
        <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin cá nhân nếu có sai sót.</li>
        <li>Yêu cầu xóa dữ liệu cá nhân khỏi hệ thống của chúng tôi.</li>
        <li>Chối từ nhận thông báo quảng cáo hoặc marketing (nếu có).</li>
        <li>Rút lại sự đồng ý sử dụng dữ liệu bất kỳ lúc nào bằng cách liên hệ với chúng tôi.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">5. Cookie và công nghệ theo dõi</h3>
      <p className="leading-relaxed mb-3">
        Chúng tôi sử dụng cookie và công nghệ theo dõi để:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Ghi nhớ tùy chọn hiển thị, vị trí đọc và các cài đặt cá nhân khác.</li>
        <li>Phân tích hành vi người dùng để cải thiện trải nghiệm và hiệu suất trang web.</li>
        <li>Hiển thị nội dung phù hợp hơn dựa trên sở thích và thói quen đọc.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">6. Liên hệ & hỗ trợ</h3>
      <p className="leading-relaxed mb-2">
        Nếu bạn có thắc mắc hoặc muốn yêu cầu xóa/cập nhật dữ liệu cá nhân, vui lòng truy cập trang <strong>Liên hệ</strong> để gửi yêu cầu. 
        Chúng tôi cam kết phản hồi trong vòng 48–72 giờ làm việc.
      </p>

      <h3 className="text-sm mt-4">
        Lưu ý: Chính sách này có thể được cập nhật theo thời gian để phản ánh các thay đổi trong hoạt động dịch vụ hoặc luật pháp. 
        Chúng tôi khuyến nghị người dùng kiểm tra định kỳ để nắm rõ các quyền và nghĩa vụ của mình.
      </h3>
    </section>
  );
}

export default PrivatePolicy;
