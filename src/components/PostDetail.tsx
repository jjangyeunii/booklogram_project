import { FullPost, Simplepost } from "@/model/post";
import { parseDate } from "@/util/date";
import { FormEvent, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
import Avatar from "./Avatar";
import { DotLoader, BarLoader } from "react-spinners";
import ToggleButton from "./ui/ToggleButton";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/posts";

type Props = {
  post: Simplepost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, booktitle, likes, createdAt } = post;
  const { data, isLoading } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  const bookauthor = data?.bookauthor;
  const bookreview = data?.bookreview;
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  const [saved, setSaved] = useState(false);

  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  return (
    <section className="flex flex-col w-full h-full">
      <div className="w-full h-[80px] flex items-center p-3 border-b border-neutral-300">
        <Avatar image={userImage} size="w-[58px] h-[58px]" />
        <p className="ml-3 font-bold text-xl">{post.username}</p>
      </div>
      <section className="flex h-[calc(100%-80px)] bg-neutral-50">
        <article className="relative flex flex-col items-center basis-3/5 border-r border-neutral-300">
          <header className="flex p-5 items-end">
            <h1 className="text-xl font-bold">{booktitle}</h1>
            <h2 className="ml-3 text-neutral-600">{bookauthor}</h2>
          </header>
          {isLoading ? (
            <div className="mt-6">
              <DotLoader color="gray" />
            </div>
          ) : (
            <p className="px-5 my-2 leading-8 overflow-y-auto">{bookreview}</p>
          )}
        </article>
        <section className="flex flex-col justify-between items-center basis-2/5">
          {isLoading ? (
            <div className="mt-36">
              <BarLoader color="gray" />
            </div>
          ) : (
            <ul className="w-full p-3">
              {comments &&
                comments?.map(({ comment, image }, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="flex justify-center items-center min-w-[50px] min-h-[50px] border-2 border-sky-500 rounded-full">
                      <Avatar image={image} size="w-[40px] h-[40px]" />
                    </div>
                    <div className="ml-2">
                      <h3 className="font-bold text-lg">{username}</h3>
                      <p>{comment}</p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
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
                onToggled={setSaved}
                onIcon={<RiBookmarkFill size={30} />}
                offIcon={<RiBookmarkLine size={30} />}
              />
            </div>
            <div className="flex flex-col px-5">
              <p className="font-bold text-lg my-2">{`${
                likes ? likes.length : 0
              } like`}</p>
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
        </section>
      </section>
    </section>
  );
}
