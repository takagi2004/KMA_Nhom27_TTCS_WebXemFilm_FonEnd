import axios from "axios";
import PhimModel from "../model/PhimModel";

const API_BASE_URL = "http://localhost:8080/api/phim";

export const PhimAPI = {
    // 1. Lấy tất cả phim
    getAllPhim: async (): Promise<PhimModel[]> => {
        const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/all`);
        return response.data;
    },

    // 2. Lấy top phim thịnh hành
    getTopThinhHanh: async (limit: number = 10): Promise<PhimModel[]> => {
        const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/top?limit=${limit}`);
        return response.data;
    },

    // 3. Lấy phim nổi bật (cho carousel)
    getPhimNoiBat: async (limit: number = 5): Promise<PhimModel[]> => {
        const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/noi-bat?limit=${limit}`);
        return response.data;
    },

    // 4. Lấy chi tiết 1 phim theo ID
    getPhimById: async (id: number): Promise<PhimModel> => {
        const response = await axios.get<PhimModel>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    // 5. (Optional) Tìm kiếm phim theo từ khóa
    searchPhim: async (keyword: string): Promise<PhimModel[]> => {
        const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
        return response.data;
    }
};
