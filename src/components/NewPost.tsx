"use client";

import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import { FaPhotoVideo } from "react-icons/fa";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";

type Props = {
  user: AuthUser;
};

const BUTTON_CLASS =
  "w-1/2 bg-sky-500 text-white  py-1 hover:font-bold hover:bg-sky-400 transition duration-200 ease-out";

export default function NewPost({ user: { username, image } }: Props) {
  const [file, setFile] = useState<File>();
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bookshort", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 pl-[50%] pt-[30%] bg-neutral-500/20">
          <FadeLoader color="gray" />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <div className="w-full max-w-xl flex items-center border border-neutral-300 p-3 rounded-t-lg">
        <Avatar size="w-[65px] h-[65px]" image={image} />
        <p className="ml-3 font-bold">{username}</p>
      </div>
      <form className="w-full max-w-xl flex flex-col" onSubmit={handleSubmit}>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-neutral-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-neutral-500/20 pointer-events-none" />
          )}
          {!file && (
            <div>
              <FaPhotoVideo className="w-20 h-20 text-gray-300" />
              <p>Drag and Drop yout image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300 p-2"
          name="text"
          id="input-text"
          rows={10}
          required
          placeholder="Write a caption..."
          ref={textRef}
        />
        <section className="w-full flex justify-around">
          <button
            className={`${BUTTON_CLASS} rounded-bl-md`}
            type="reset"
            onClick={() => setFile(undefined)}
          >
            Cancel
          </button>
          <button type="submit" className={`${BUTTON_CLASS} rounded-br-md`}>
            Publish
          </button>
        </section>
      </form>
    </section>
  );
}
