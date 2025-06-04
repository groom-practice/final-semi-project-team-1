"use client";

import Spinner from "@/components/Spinner";
import { Photo } from "@/type/photo";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function PhotoDetail() {
  const { id } = useParams();
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
      .catch((err) => setError(err));
  }, [id]);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!photo) return <Spinner />;

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-4">
      <Image
        src={photo.download_url}
        alt={photo.id}
        width={500}
        height={500}
        className="rounded-lg shadow-md"
      />
      <div className="h-full text-right p-2">
        <p className="text-md">author by</p>
        <p className="text-lg font-bold">{photo.author}</p>
      </div>
    </div>
  );
}

export default PhotoDetail;
