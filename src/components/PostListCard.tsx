import { Simplepost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { BiSmile } from "react-icons/bi";
import { parseDate } from "@/util/date";
import { FormEvent, useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import ToggleButton from "./ui/ToggleButton";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";

type Props = {
  post: Simplepost;
  priority: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const {
    id,
    username,
    userImage,
    image,
    booktitle,
    bookshort,
    comments,
    likes,
    createdAt,
  } = post;
  const [openModal, setOpenModal] = useState(false);
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const saved = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

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
      <div className="w-full flex py-3 px-5 justify-between">
        <ToggleButton
          toggled={liked}
          onToggled={handleLike}
          onIcon={<AiFillHeart className="fill-red-500" size={30} />}
          offIcon={<AiOutlineHeart size={30} />}
        />
        <ToggleButton
          toggled={saved}
          onToggled={handleBookmark}
          onIcon={<RiBookmarkFill size={30} />}
          offIcon={<RiBookmarkLine size={30} />}
        />
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
