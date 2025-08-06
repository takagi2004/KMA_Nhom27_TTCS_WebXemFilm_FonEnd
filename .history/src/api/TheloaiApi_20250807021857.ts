import axios from "axios";
import { PhimDTO } from "../model/PhimModel";  // nếu bạn đã có model này
import { TheLoaiDTO } from "../model/TheLoaiModel"; // tạo file model cho thể loại

const API_BASE_URL = "http://localhost:8080/api/theloai"; // Đổi theo backend

export const TheLoaiAPI = {
  /** Lấy tất cả thể loại kèm danh sách phim */
  getAllTheLoaiWithPhim: async (): Promise<TheLoaiDTO[]> => {
    const res = await axios.get<TheLoaiDTO[]>(`${API_BASE_URL}`);
    return res.data;
  },

  /** Lấy danh sách phim theo id thể loại */
  getPhimByTheLoaiId: async (id: number): Promise<PhimDTO[]> => {
    const res = await axios.get<PhimDTO[]>(`${API_BASE_URL}/${id}/phim`);
    return res.data;
  }
};
