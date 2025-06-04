"use client";

import Modal from "@/components/Modal";
import PhotoItem from "@/components/PhotoItem";
import Spinner from "@/components/Spinner";
import usePhotoItem from "@/hooks/usePhotoItem";
import { useParams } from "next/navigation";

const ModalPhotoItem = () => {
  const { id } = useParams();
  const { photo, error } = usePhotoItem(String(id));

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!photo)
    return (
      <Modal>
        <Spinner />
      </Modal>
    );

  return (
    <Modal>
      <PhotoItem photo={photo} />
    </Modal>
  );
};

export default ModalPhotoItem;
