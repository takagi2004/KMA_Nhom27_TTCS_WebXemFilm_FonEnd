import axios from "axios";
import PhimModel from "../models/PhimModel";

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

    // 3. Lấy chi tiết 1 phim
    getPhimById: async (id: number): Promise<PhimModel> => {
        const response = await axios.get<PhimModel>(`${API_BASE_URL}/${id}`);
        return response.data;
    }
};
