import { useCacheKeys } from "@/context/CacheKeysContext";
import { Comment, Simplepost } from "@/model/post";
import { useCallback } from "react";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

async function postDelete(id: string) {
  return fetch(`/api/posts/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<Simplepost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: Simplepost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: Simplepost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const setDeletePost = useCallback(
    (post: Simplepost) => {
      const deletedPosts = posts?.filter((p) => p.id !== post.id);
      return mutate(postDelete(post.id), {
        optimisticData: deletedPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return { posts, isLoading, error, setLike, postComment, setDeletePost };
}
