import { Simplepost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePosts() {
  const { data: posts, isLoading, error } = useSWR<Simplepost[]>("/api/posts");
  const { mutate } = useSWRConfig();

  const setLike = (post: Simplepost, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate("/api/posts"));
  };
  return { posts, isLoading, error, setLike };
}
