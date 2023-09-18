import { DetailUser } from "@/model/user";
import useSWR from "swr";

async function updateBookmark(postID: string, bookmark: boolean) {
  return fetch(`/api/bookmarks`, {
    method: "PUT",
    body: JSON.stringify({ id: postID, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<DetailUser>("/api/me");

  const setBookmark = (postID: string, bookmark: boolean) => {
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
  };
  return { user, isLoading, error, setBookmark };
}
