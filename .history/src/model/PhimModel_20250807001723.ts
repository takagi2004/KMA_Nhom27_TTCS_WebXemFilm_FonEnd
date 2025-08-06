import TapPhimModel from "./TapPhimModel";
import DanhGiaModel from "./DanhGiaModel";

export interface PhimModel {
    idPhim: number;
    tenPhim: string;
    moTa?: string;
    namPhatHanh?: number;
    soLuong?: number;
    quocGia?: string;
    anhBia?: string;
    listAnhLienQuan?: string;
    trailer?: string;
    ngayTao?: string;

    // Thể loại
    theLoai?: string[];

    // Quan hệ
    tapPhim?: TapPhimModel[];
    soLuotThich?: number;
    soLuotXem
    diemTrungBinh?: number;
    danhGia?: DanhGiaModel[];
    goiDangKy?: string[];
}

export default PhimModel;
