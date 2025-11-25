export const formatTimeVN = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Chuyển về giờ VN
  const dateVN = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const nowVN = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const diff = nowVN - dateVN; // chênh lệch ms

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < minute) return "Vừa xong";
  if (diff < hour) return `${Math.floor(diff / minute)} phút trước`;
  if (diff < day) return `${Math.floor(diff / hour)} giờ trước`;
  if (diff < week) return `${Math.floor(diff / day)} ngày trước`;

  // nếu >7 ngày => dd/mm/yyyy
  const d = dateVN.getDate().toString().padStart(2, "0");
  const m = (dateVN.getMonth() + 1).toString().padStart(2, "0");
  const y = dateVN.getFullYear();

  return `${d}/${m}/${y}`;
}

// Test
console.log(formatTimeVN("2025-11-22T10:20:27.296+00:00"));
