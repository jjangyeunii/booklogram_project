import useSWR, { useSWRConfig } from "swr";
import { Comment, FullPost } from "@/model/post";
import { useCallback } from "react";

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

async function postUpdate(
  id: string,
  title: string,
  author: string,
  short: string,
  review: string
) {
  return fetch(`/api/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, author, short, review }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );

  const setUppdatePost = useCallback(
    (title: string, author: string, short: string, review: string) => {
      if (!post) return;
      const newPost = {
        ...post,
        booktitle: title,
        bookauthor: author,
        bookreview: review,
        bookshort: short,
      };

      return mutate(postUpdate(post.id, title, author, short, review), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );
  return { post, isLoading, error, postComment, setUppdatePost };
}
