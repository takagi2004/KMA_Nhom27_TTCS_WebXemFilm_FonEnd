import { jwtDecode } from "jwt-decode";

export const xuLyDangNhapThanhCong = (
  token: string,
  nguoiDung: any,
  delay: number = 1000
) => {
  const decoded: any = jwtDecode(token);

  // Tự gán quyenList nếu chưa có
  if (!nguoiDung.quyenList) {
    nguoiDung.quyenList = [];

    if (decoded.isAdmin) {
      nguoiDung.quyenList.push({ idQuyen: 1, tenQuyen: "ADMIN" });
    } else if (decoded.isVipUser) {
      nguoiDung.quyenList.push({ idQuyen: 2, tenQuyen: "VIP_USER" });
    } else {
      nguoiDung.quyenList.push({ idQuyen: 3, tenQuyen: "USER" });
    }
  }

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(nguoiDung));

  setTimeout(() => {
    if (decoded.isAdmin) {
      window.location.href = "/admin";
    } else if (decoded.isVipUser) {
      window.location.href = "/vip";
    } else {
      window.location.href = "/";
    }
  }, delay);
};
