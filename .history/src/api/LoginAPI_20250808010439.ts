import axios from "axios";
import { DangKyModel } from "../model/DangKyModel";
import { DangNhapModel } from "../model/DangNhapModel";

const API_BASE_URL = "http://localhost:8080/api";

export const DangKyAPI = {
  dangKyTaiKhoan: async (duLieu: DangKyModel): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/tai-khoan/dang-ky`, duLieu);
    } catch (error: any) {
      console.error("Lỗi khi đăng ký tài khoản:", error);
      throw error.response?.data || error.message;
    }
  },
};
export const DangNhapAPI = {
  dangNhap: async (duLieu: DangNhapModel): Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/tai-khoan/dang-nhap",
        duLieu,
        { withCredentials: true } // nếu bạn dùng session/cookie
      );
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi đăng nhập:", error);
      throw error.response?.data || error.message;
    }
  },
};

