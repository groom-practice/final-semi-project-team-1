"use client";
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
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 place-items-center gap-3 p-6">
      {photos.map((photo) => (
        <div key={photo.id} className="">
          <Link href={`/photos/${photo.id}`}>
            <Image
              src={photo.download_url}
              alt={`${photo.id} Image`}
              width={photo.width}
              height={photo.height}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PhotosList;
