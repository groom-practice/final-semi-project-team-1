"use client";

import PhotoItem from "@/components/PhotoItem";
import Spinner from "@/components/Spinner";
import usePhotoItem from "@/hooks/usePhotoItem";
import { useParams } from "next/navigation";

function PhotoDetail() {
  const { id } = useParams();
  const { photo, error } = usePhotoItem(id);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!photo)
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );

  return (
    <>
      <PhotoItem photo={photo} />
    </>
  );
}

export default PhotoDetail;
