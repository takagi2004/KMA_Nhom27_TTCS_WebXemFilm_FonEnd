// src/utils/authHelper.ts

export const xuLyDangNhapThanhCong = (
  token: string,
  nguoiDung: any,
  navigate: (path: string) => void,
  delay: number = 1000
) => {
  // Lưu localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(nguoiDung));

  // Phân quyền
  const quyenList = nguoiDung?.quyenList || [];
  const tenQuyens = quyenList.map((q: any) => q.tenQuyen);

  setTimeout(() => {
    if (tenQuyens.includes("ADMIN")) {
      navigate("/admin");
    } else if (tenQuyens.includes("VIP_USER")) {
      navigate("/vip");
    } else {
      // Reload trang toàn bộ
        setTimeout(() => {
        window.location.reload();
        }, 1000); // delay 1s để hiển thị thông báo
    }
  }, delay);
};
