import PhimModel from "./PhimModel";

export interface TheLoaiDTO {
  idTheLoai: number;
  tenTheLoai: string;
  phimList: PhimModel[];
}