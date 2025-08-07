export const xuLyDangNhapThanhCong = (
  token: string,
  nguoiDung: any,
  delay: number = 1000
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(nguoiDung));

  const quyenList = nguoiDung?.quyenList || [];
  const tenQuyens = quyenList.map((q: any) => q.tenQuyen);

  setTimeout(() => {
    if (tenQuyens.includes("ADMIN")) {
      window.location.href = "/admin";
    } else if (tenQuyens.includes("VIP_USER")) {
      window.location.href = "/vip";
    } else {
      window.location.href = "/";
    }
  }, delay);
};
