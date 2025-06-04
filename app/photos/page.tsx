"use client";
import FavoriteBtn from "@/components/FavoriteBtn";
import Spinner from "@/components/Spinner";
import { Photo } from "@/type/photo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function PhotosList() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/fetchImage")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  if (!photos) return <Spinner />;

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 place-items-center gap-4 p-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
          <FavoriteBtn photo={photo} rightPos="right-2" />
          <Link href={`/photos/${photo.id}`}>
            <Image
              src={photo.download_url}
              alt={`${photo.id} Image`}
              width={600}
              height={600}
              className="h-full object-cover object-center"
              placeholder="blur"
              blurDataURL={photo.download_url}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PhotosList;
