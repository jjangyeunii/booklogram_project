"use client";

import { Dispatch, SetStateAction } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
  offsetX: number;
  offsetY: number;
};

const BUTTON_CLASS = "flex items-center justify-center w-full p-2";

export default function PostMenu({ offsetX, offsetY, onClose }: Props) {
  return (
    <section
      className={`fixed flex flex-col items-center w-[150px] h-[125px] bg-neutral-100 rounded-lg shadow-lg`}
      style={{ top: `${offsetY + 5}px`, left: `${offsetX - 120}px` }}
    >
      <button
        className={`${BUTTON_CLASS} border-b-2 text-sky-600`}
        onClick={() => {}}
      >
        <BsFillPencilFill />
        <p className="ml-1">Edit</p>
      </button>
      <button
        className={`${BUTTON_CLASS} border-b-2  text-red-600`}
        onClick={() => {}}
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
