"use client";

import { Simplepost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import ActionBar from "./ActionBar";
import { useSession } from "next-auth/react";
import PostMenuButton from "./PostMenuButton";

type Props = {
  post: Simplepost;
  priority: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const { username, userImage, image, booktitle, bookshort, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const isMyPost = user?.username === username;

  return (
    <article className="w-full flex flex-col justify-center items-center rounded-md bg-neutral-50 shadow-md mr-4 border border-gray-200">
      <div className="w-full flex justify-between items-center p-3">
        <div className="flex items-center">
          <Avatar image={userImage} size="w-[50px] h-[50px]" />
          <p className="ml-3 font-bold text-xl">{post.username}</p>
        </div>
        {isMyPost && <PostMenuButton />}
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post}>
        <div className="flex items-center">
          <h2 className="text-xl font-bold truncate">{booktitle}</h2>
          <p className="ml-3 text-xl truncate">{bookshort}</p>
        </div>
        {comments > 1 ? (
          <button
            className="flex font-bold mt-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        ) : (
          <button
            className="flex font-bold mt-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View detail book review`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
