import { Simplepost } from "@/model/post";
import Avatar from "./Avatar";
import { DotLoader } from "react-spinners";
import ActionBar from "./ActionBar";
import useFullPost from "@/hooks/post";
import BarSpinner from "./BarSpinner";

type Props = {
  post: Simplepost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, booktitle } = post;
  const { post: data, isLoading, postComment } = useFullPost(id);
  const comments = data?.comments;
  const bookauthor = data?.bookauthor;
  const bookreview = data?.bookreview;

  return (
    <section className="flex flex-col w-full h-full">
      <div className="w-full h-[80px] flex items-center p-3 border-b border-neutral-300">
        <Avatar image={userImage} size="w-[58px] h-[58px]" />
        <p className="ml-3 font-bold text-xl">{username}</p>
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
          <ul className="w-full p-3">
            {isLoading && (
              <div className="flex mt-24 justify-center">
                <BarSpinner color="gray" />
              </div>
            )}
            {comments &&
              comments?.map(({ comment, username, image }, idx) => (
                <li key={idx} className="flex items-center mb-3">
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

          <ActionBar post={post} onComment={postComment} />
        </section>
      </section>
    </section>
  );
}
