"use client";

import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import ModalPortal from "./ui/ModalPortal";
import PostMenuModal from "./PostMenuModal";
import PostMenu from "./PostMenu";
import { Simplepost } from "@/model/post";

type Props = {
  post: Simplepost;
};

export default function PostMenuButton({ post }: Props) {
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    setOpenMenuModal(true);
    setOffsetX(Math.floor(e.currentTarget.getBoundingClientRect().left));
    setOffsetY(Math.floor(e.currentTarget.getBoundingClientRect().bottom));
  };
  return (
    <section>
      <button onClick={handleClick}>
        <HiDotsVertical size={25} />
      </button>
      {openMenuModal && (
        <ModalPortal>
          <PostMenuModal onClose={() => setOpenMenuModal(false)}>
            <PostMenu
              offsetX={offsetX}
              offsetY={offsetY}
              onClose={setOpenMenuModal}
              post={post}
            />
          </PostMenuModal>
        </ModalPortal>
      )}
    </section>
  );
}
