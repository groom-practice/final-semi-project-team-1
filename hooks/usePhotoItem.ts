import { Photo } from "@/type/photo";
import { useEffect, useState } from "react";

function usePhotoItem(id: string | string[] | undefined) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/fetchImage/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("사진 상세정보를 불러오지 못했어용");
        return res.json();
      })
      .then((data) => setPhoto(data))
      .catch((err) => setError(err.message));
  }, [id]);

  return { photo, error };
}

export default usePhotoItem;
