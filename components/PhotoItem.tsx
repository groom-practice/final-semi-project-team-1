import { Photo } from "@/type/photo";
import Image from "next/image";
import React from "react";
import FavoriteBtn from "./FavoriteBtn";

const PhotoItem = ({ photo }: { photo: Photo }) => {
  return (
    <div className="relative overflow-hidden bg-white flex justify-center">
      <FavoriteBtn photo={photo} rightPos="right-20" />
      <div>
        <Image
          src={photo.download_url}
          alt={photo.id}
          width={500}
          height={500}
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="h-full w-fit text-right p-2">
        <span className="text-md">author by</span>
        <p className="text-2xl font-semibold text-gray-800">{photo.author}</p>
      </div>
    </div>
  );
};

export default PhotoItem;
