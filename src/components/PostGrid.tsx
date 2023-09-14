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
    <section>
      {isLoading && <FadeLoader color="gray" />}
      <ul>
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
