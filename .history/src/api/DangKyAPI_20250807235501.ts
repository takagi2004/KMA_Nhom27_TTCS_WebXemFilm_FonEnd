import axios from "axios";
import { DangKyModel } from "../model/DangKyModel";

const API_BASE_URL = "http://localhost:8080/api"; // Cập nhật nếu cần

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
