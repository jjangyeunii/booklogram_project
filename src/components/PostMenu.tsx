"use client";

import usePosts from "@/hooks/posts";
import { Simplepost } from "@/model/post";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
  offsetX: number;
  offsetY: number;
  post: Simplepost;
};

const BUTTON_CLASS =
  "flex items-center justify-center w-full p-2 hover:font-bold";

export default function PostMenu({ offsetX, offsetY, onClose, post }: Props) {
  const { setDeletePost } = usePosts();
  const handleDelete = () => {
    if (window.confirm("포스트를 정말 삭제하시겠습니까?")) {
      setDeletePost(post);
    }
  };
  return (
    <section
      className={`fixed flex flex-col items-center w-[150px] h-[125px] bg-neutral-100 rounded-lg shadow-lg`}
      style={{ top: `${offsetY + 5}px`, left: `${offsetX - 120}px` }}
    >
      <Link
        href={`/update/${post.id}`}
        className={`${BUTTON_CLASS} border-b-2 text-sky-600`}
      >
        <BsFillPencilFill />
        <p className="ml-1">Edit</p>
      </Link>
      <button
        className={`${BUTTON_CLASS} border-b-2  text-red-600`}
        onClick={handleDelete}
      >
        <BsFillTrashFill />
        <p className="ml-1">Delete</p>
      </button>
      <button
        className={`${BUTTON_CLASS} text-gray-600`}
        onClick={() => onClose(false)}
      >
        Close
      </button>
    </section>
  );
}
