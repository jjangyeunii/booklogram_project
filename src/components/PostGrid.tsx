import { Simplepost } from "@/model/post";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<Simplepost[]>(`/api/users/${username}/${query}`);
  return (
    <section className="w-full text-center">
      {isLoading && (
        <div className="w-full flex justify-center mt-24">
          <FadeLoader color="gray" />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-2 py-4 px-8">
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={idx < 6} />
            </li>
          ))}
      </ul>
    </section>
  );
}
