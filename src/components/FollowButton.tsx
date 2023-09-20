"use client";

import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: logInUser, toggleFollow } = useMe();

  const showButton = logInUser && logInUser.username !== username;
  const isFollowing =
    logInUser && logInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? "Unfollow" : "Follow";
  const handleFollow = () => {
    toggleFollow(user.id, !isFollowing);
  };

  return (
    <>
      {showButton && (
        <button
          className={`${
            isFollowing ? "bg-red-500" : "bg-sky-500"
          } text-white font-bold text-xl py-1 px-6 rounded-md`}
          onClick={handleFollow}
        >
          {buttonText}
        </button>
      )}
    </>
  );
}
