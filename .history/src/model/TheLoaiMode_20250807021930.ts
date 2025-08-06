import PhimModel from "./PhimModel";

export interface TheLoaiModel {
  idTheLoai: number;
  tenTheLoai: string;
  phimList: PhimModel[];
}