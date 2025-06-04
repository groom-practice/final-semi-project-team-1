"use client";

import Modal from "@/components/Modal";
import PostDetailItem from "@/components/PostDetailItem";
import Spinner from "@/components/Spinner";
import usePostItem from "@/hooks/usePostItem";
import { useParams } from "next/navigation";

const ModalPostItem = () => {
  const { id } = useParams();
  const { post, user, comments, loading } = usePostItem(String(id));

  if (loading) return <Spinner />;
  if (!post || !user) return <p>데이터를 불러올 수 없음</p>;

  return (
    <Modal>
      <PostDetailItem post={post} user={user} comments={comments} />
    </Modal>
  );
};

export default ModalPostItem;
