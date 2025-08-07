export interface NguoiDungModel {
  idNguoiDung: number;
  hoTen: string;
  email: string;
  tenDangNhap: string;
  matKhau?: string; // không cần thiết lưu trên frontend, nhưng có thể nếu API trả về
  soDienThoai?: string;
  avata?: string;
  vaiTro: string;
  ngayTao?: string; // hoặc Date nếu convert
  quyenList?: QuyenModel[];
  yeuThich?: YeuThichModel[];
  lichSuXem?: LichSuXemModel[];
  danhGia?: DanhGiaDTO[];
  goiDangKy?: GoiDangKyDTO[];
}