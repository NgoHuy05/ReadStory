export const formatTimeVN = (date: Date | string) => {
  const d = new Date(new Date(date).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 7) {
    return d.toLocaleDateString("vi-VN");
  }
  if (diffDays >= 1) return `${diffDays} ngày trước`;
  if (diffHours >= 1) return `${diffHours} giờ trước`;
  if (diffMinutes >= 1) return `${diffMinutes} phút trước`;
  return "Vừa xong";
};
