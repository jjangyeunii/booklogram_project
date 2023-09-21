"use client";

import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import { FaPhotoVideo } from "react-icons/fa";
import { ChangeEvent, useState } from "react";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [file, setFile] = useState<File>();
  const [dragging, setDragging] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <section>
      <div>
        <Avatar size="w-[65px] h-[65px]" image={image} />
        <p>{username}</p>
      </div>
      <form>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FaPhotoVideo className="w-20 h-20 text-gray-300" />
          <p>Drag and Drop yout image here or click</p>
        </label>
        <textarea
          name="text"
          id="input-text"
          rows={10}
          required
          placeholder="Write a caption..."
        />
        <button onClick={() => {}}>Publish</button>
      </form>
    </section>
  );
}
