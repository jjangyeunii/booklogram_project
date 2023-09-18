import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ToggleButton from "./ui/ToggleButton";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { parseDate } from "@/util/date";
import { FormEvent } from "react";
import { BiSmile } from "react-icons/bi";
import { Simplepost, Comment } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";

type Props = {
  post: Simplepost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user.username) : false;
  const saved = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  return (
    <section className="w-full ">
      <div className="flex py-3 px-4 justify-between">
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
      <div className="flex flex-col px-5">
        <p className="font-bold text-lg my-2">{`${
          likes ? likes.length : 0
        } like`}</p>
        {children}
        <p className="mb-5 text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
      <form
        className="w-full flex items-center justify-between px-2 border-t border-neutral-400"
        onClick={(e: FormEvent) => e.preventDefault()}
      >
        <BiSmile size={35} />
        <input
          className="w-full p-3 mx-2 text-lg border-none outline-none"
          type="text"
          placeholder="Add a bookcomment..."
        />
        <button className="font-bold text-sky-500 text-lg hover:text-sky-300">
          Post
        </button>
      </form>
    </section>
  );
}
