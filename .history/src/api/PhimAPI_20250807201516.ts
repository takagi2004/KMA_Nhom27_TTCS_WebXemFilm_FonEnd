// src/api/PhimAPI.ts
import axios from "axios";
import PhimModel from "../model/PhimModel";

const API_BASE_URL = "http://localhost:8080/api/phim";

export const PhimAPI = {
  getAllPhim: async (): Promise<PhimModel[]> => {
    const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/all`);
    return response.data;
  },

  getTopThinhHanh: async (limit: number = 10): Promise<PhimModel[]> => {
    const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/top?limit=${limit}`);
    return response.data;
  },

  getPhimNoiBat: async (limit: number = 5): Promise<PhimModel[]> => {
    const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/noi-bat?limit=${limit}`);
    return response.data;
  },

  getPhimById: async (id: number): Promise<PhimModel> => {
    const response = await axios.get<PhimModel>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  searchPhim: async (keyword: string): Promise<PhimModel[]> => {
    const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  getPhimMoiNhat: async (limit: number = 10): Promise<PhimModel[]> => {
    const response = await axios.get<PhimModel[]>(`${API_BASE_URL}/moi-nhat?limit=${limit}`);
    return response.data;
  },
};
