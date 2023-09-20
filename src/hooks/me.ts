import { DetailUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postID: string, bookmark: boolean) {
  return fetch(`/api/bookmarks`, {
    method: "PUT",
    body: JSON.stringify({ id: postID, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetID: string, follow: boolean) {
  return fetch(`/api/follow`, {
    method: "PUT",
    body: JSON.stringify({ id: targetID, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<DetailUser>("/api/me");

  const setBookmark = useCallback(
    (postID: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postID]
          : bookmarks.filter((mark) => mark != postID),
      };

      return mutate(updateBookmark(postID, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetID: string, follow: boolean) => {
      return mutate(updateFollow(targetID, follow), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}
