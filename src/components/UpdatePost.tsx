"use client";

import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import useFullPost from "@/hooks/post";

type Props = {
  user: AuthUser;
  postId: string;
};

const BUTTON_CLASS =
  "w-1/2 bg-sky-500 text-white py-1 hover:font-bold hover:bg-sky-400 transition duration-200 ease-out";

export default function UpdatePost({
  user: { username, image },
  postId,
}: Props) {
  const { post, isLoading } = useFullPost(postId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [titleValue, setTitleValue] = useState(post?.booktitle);
  const [authorValue, setAuthorValue] = useState(post?.bookauthor);
  const [shortValue, setShortValue] = useState(post?.bookshort);
  const [reviewValue, setReviewValue] = useState(post?.bookreview);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // client에서 patch 요청 구현하기
  };

  return (
    <section className="w-full flex flex-col items-center my-6">
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
      {post && (
        <div className="relative w-full max-w-xl aspect-square">
          <Image
            className="object-cover"
            src={post?.image}
            alt="local file"
            fill
            sizes="650px"
          />
        </div>
      )}
      <form className="w-full max-w-xl flex flex-col" onSubmit={handleSubmit}>
        <input
          className="outline-none text-lg border border-neutral-300 p-2"
          id="input-title"
          type="text"
          required
          placeholder="Write a book title..."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <input
          className="outline-none text-lg border border-neutral-300 p-2"
          id="input-author"
          type="text"
          required
          placeholder="Write a book author..."
          value={authorValue}
          onChange={(e) => setAuthorValue(e.target.value)}
        />
        <textarea
          className="outline-none text-lg border border-neutral-300 p-2"
          name="text"
          id="input-short"
          rows={1}
          required
          placeholder="Write a caption..."
          value={shortValue}
          onChange={(e) => setShortValue(e.target.value)}
        />
        <textarea
          className="outline-none text-lg border border-neutral-300 p-2"
          name="text"
          id="input-review"
          rows={10}
          required
          placeholder="Write a book review..."
          value={reviewValue}
          onChange={(e) => setReviewValue(e.target.value)}
        />
        <section className="w-full flex justify-around">
          <button
            className={`${BUTTON_CLASS} rounded-bl-md`}
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button type="submit" className={`${BUTTON_CLASS} rounded-br-md`}>
            Update
          </button>
        </section>
      </form>
    </section>
  );
}
