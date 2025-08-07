import React, { useEffect, useState } from "react";
import { PhimAPI } from "../../api/PhimAPI";
const DeXuatPhim: React.FC = () => {
  const [dsDeXuat, setDsDeXuat] = useState<PhimModel[]>([]);

  useEffect(() => {
    PhimAPI.layDanhSachPhim().then((res) => {
      setDsDeXuat(res.slice(0, 10)); // Lấy 10 phim đề xuất
    });
  }, []);

  return (
    <div className="my-4">
      <h4 className="mb-3">Phim đề xuất cho bạn</h4>
      <div
        className="d-flex overflow-auto"
        style={{ gap: "16px", paddingBottom: "8px" }}
      >
        {dsDeXuat.map((phim) => (
          <div key={phim.idPhim} style={{ minWidth: "200px", flex: "0 0 auto" }}>
            <PhimCard phim={phim} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeXuatPhim;
