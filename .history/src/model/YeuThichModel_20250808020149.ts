import PhimModel from "./PhimModel";

export interface YeuThichModel {
  idYeuThich: number;
  ngayThich: string; // LocalDateTime -> string
  phim: PhimModel;
  // Không cần đưa nguoiDung vì đã nằm trong NguoiDungModel cha
}