"use client";

import { MouseEventHandler, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import ModalPortal from "./ui/ModalPortal";
import PostMenuModal from "./PostMenuModal";
import PostMenu from "./PostMenu";

export default function PostMenuButton() {
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    setOpenMenuModal(true);
    setOffsetX(Math.floor(e.currentTarget.getBoundingClientRect().left));
    setOffsetY(Math.floor(e.currentTarget.getBoundingClientRect().top));
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
            />
          </PostMenuModal>
        </ModalPortal>
      )}
    </section>
  );
}
