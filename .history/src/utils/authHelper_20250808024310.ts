import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  isAdmin?: boolean;
  isVipUser?: boolean;
  // các trường khác
}

const xuLyDangNhapThanhCong = (
  token: string,
  nguoiDung: any,
  delay: number = 1000
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(nguoiDung));

  const decoded: TokenPayload = jwtDecode(token);

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
