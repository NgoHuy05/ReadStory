'use client';

const Contact = () => {
  return (
    <section id="contact" className="max-w-4xl mx-auto rounded-2xl p-6 md:p-10 mb-16">
      <h2 className="text-2xl font-bold mb-4">Liên hệ</h2>
      <p className="leading-relaxed mb-4">
        Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Dù là góp ý, câu hỏi, phản hồi về nội dung, hay báo cáo
        vi phạm bản quyền, mọi thông tin đều quan trọng để [Truyện Hay] ngày càng hoàn thiện hơn.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Thông tin liên hệ</h3>
          <ul className="space-y-2">
            <li><strong>Email:</strong> support@[tenwebsite].com</li>
            <li><strong>Fanpage:</strong> facebook.com/[tenwebsite]</li>
            <li><strong>Địa chỉ:</strong> (Nếu có, điền vào đây)</li>
            <li><strong>Hotline:</strong> 0123 456 789 (tùy vào nhu cầu)</li>
          </ul>
          <p className="mt-3">
            Thời gian phản hồi thông thường từ 24–72 giờ tùy vào mức độ yêu cầu. Đối với các trường hợp khẩn cấp,
            vui lòng gọi trực tiếp hotline để được hỗ trợ nhanh chóng.
          </p>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl px-4 py-2">
          <h3 className="font-semibold mb-2 ">Gửi tin nhắn trực tiếp</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-medium mb-1">Tên của bạn</label>
              <input type="text" className="w-full rounded-md border p-2" placeholder="Tên" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" className="w-full rounded-md border p-2" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block font-medium mb-1">Nội dung</label>
              <textarea className="w-full rounded-md border p-2 h-32" placeholder="Nội dung liên hệ..."></textarea>
            </div>
            <div className="text-right">
              <button className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                Gửi liên hệ
              </button>
            </div>
          </form>
          <p className="mt-2 text-xs">
            (Form mẫu — cần backend để gửi email hoặc lưu vào hệ thống.)
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Báo cáo vi phạm bản quyền</h4>
        <p className="leading-relaxed mb-2">
          Nếu bạn là chủ sở hữu bản quyền và phát hiện nội dung vi phạm, vui lòng gửi email kèm bằng chứng
          (liên kết, mô tả chi tiết) để chúng tôi xử lý nhanh nhất. Chúng tôi cam kết bảo vệ quyền lợi của
          tác giả và gỡ bỏ nội dung vi phạm trong thời gian sớm nhất.
        </p>
        <p className="leading-relaxed">
          Mọi thông tin gửi đến đều được bảo mật tuyệt đối và chỉ sử dụng cho mục đích xử lý vi phạm.
        </p>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Lời khuyên khi liên hệ</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ghi rõ họ tên và email để chúng tôi dễ dàng phản hồi.</li>
          <li>Mô tả chi tiết vấn đề hoặc yêu cầu để quá trình hỗ trợ nhanh hơn.</li>
          <li>Đối với báo cáo vi phạm, cung cấp đường dẫn hoặc ảnh minh họa cụ thể.</li>
          <li>Kiểm tra email thường xuyên để nhận phản hồi từ đội ngũ chúng tôi.</li>
        </ul>
      </div>
    </section>
  );
}
export default Contact;