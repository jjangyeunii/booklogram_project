import { Simplepost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import { BiSmile } from "react-icons/bi";
import { parseDate } from "@/util/date";
import { FormEvent } from "react";

type Props = {
  post: Simplepost;
  priority: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const {
    username,
    userImage,
    image,
    booktitle,
    bookshort,
    comments,
    likes,
    createdAt,
  } = post;
  return (
    <article className="w-full flex flex-col justify-center items-center rounded-md bg-neutral-50 shadow-md mr-4 border border-gray-200">
      <div className="w-full flex items-center p-3">
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
      />
      <div className="w-full flex py-3 px-5 justify-between">
        <AiOutlineHeart size={30} />
        <RiBookmarkLine size={30} />
      </div>
      <div className="w-full flex flex-col px-5">
        <p className="font-bold text-lg my-2">{`${
          likes ? likes.length : 0
        } like`}</p>
        <div className="flex items-center">
          <h2 className="text-xl font-bold truncate">{booktitle}</h2>
          <p className="ml-3 text-xl truncate">{bookshort}</p>
        </div>
        <p className="mt-2 mb-5 text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
      <form
        className="w-full flex items-center justify-between px-5 border-t border-neutral-400"
        onClick={(e: FormEvent) => e.preventDefault()}
      >
        <BiSmile size={35} />
        <input
          className="w-full p-4 mx-5 text-lg border-none outline-none"
          type="text"
          placeholder="Add a bookcomment..."
        />
        <button className="font-bold text-sky-500 text-lg hover:text-sky-300">
          Post
        </button>
      </form>
    </article>
  );
}
