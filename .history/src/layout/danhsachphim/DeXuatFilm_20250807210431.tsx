import React, { useEffect, useState, useRef, useCallback } from "react";
import PhimModel from "../../model/PhimModel";
import { PhimAPI } from "../../api/PhimAPI";
import PhimCard from "./Props/PhimCard";

interface DeXuatFilmProps {
  currentPhimId: number;
  title?: string;
}

const DeXuatFilm: React.FC<DeXuatFilmProps> = ({ currentPhimId, title = "Phim đề xuất" }) => {
  const [danhSachPhim, setDanhSachPhim] = useState<PhimModel[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhimRef = useRef<HTMLDivElement>(null);

  const fetchPhim = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await PhimAPI.getTopThinhHanh(page * 10); // giả định API trả về 10 phim mỗi lần
      const filtered = response.filter(p => p.idPhim !== currentPhimId);
      setDanhSachPhim(filtered);
    } catch (error) {
      console.error("Lỗi khi tải phim đề xuất:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, currentPhimId]);

  useEffect(() => {
    fetchPhim();
  }, [fetchPhim]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (lastPhimRef.current) {
      observer.current.observe(lastPhimRef.current);
    }
  }, [danhSachPhim]);

  return (
    <div className="bg-dark p-3 rounded border border-secondary">
      <h5 className="text-warning mb-3">{title}</h5>
      <div className="d-flex flex-column gap-3">
        {danhSachPhim.map((phim, index) => (
          <div
            key={phim.idPhim}
            ref={index === danhSachPhim.length - 1 ? lastPhimRef : null}
          >
            <PhimCard phim={phim} />
          </div>
        ))}
        {isLoading && <div className="text-center text-muted">Đang tải thêm...</div>}
      </div>
    </div>
  );
};

export default DeXuatFilm;
