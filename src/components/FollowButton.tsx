"use client";

import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: logInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = logInUser && logInUser.username !== username;
  const isFollowing =
    logInUser && logInUser.following.find((item) => item.username === username);
  const buttonText = isFollowing ? "Unfollow" : "Follow";
  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <section className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <button
            className={`${
              isFollowing ? "bg-red-500" : "bg-sky-500"
            } text-white font-bold text-xl py-1 px-6 rounded-md ${
              isUpdating && "opacity-80"
            }`}
            onClick={handleFollow}
            disabled={isUpdating}
          >
            {buttonText}
          </button>
        </section>
      )}
    </>
  );
}
