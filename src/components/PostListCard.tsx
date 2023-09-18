import { Simplepost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import ActionBar from "./ActionBar";

type Props = {
  post: Simplepost;
  priority: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, booktitle, bookshort, comments } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="w-full flex flex-col justify-center items-center rounded-md bg-neutral-50 shadow-md mr-4 border border-gray-200">
      <div className="w-full flex items-center p-3 md:py-2">
        <Avatar image={userImage} size="w-[58px] h-[58px]" />
        <p className="ml-3 font-bold text-xl">{post.username}</p>
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
      <ActionBar post={post} onComment={() => {}}>
        <div className="flex items-center">
          <h2 className="text-xl font-bold truncate">{booktitle}</h2>
          <p className="ml-3 text-xl truncate">{bookshort}</p>
        </div>
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
