"use client";

import useSWR from "swr";
import { PulseLoader } from "react-spinners";
import { DetailUser } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";
import ScrollCarousel from "./ui/ScrollCarousel";

export default function Followingbar() {
  const { data, isLoading } = useSWR<DetailUser>("/api/me");
  const following = data?.following;
  //   console.log(data);
  return (
    <section className="w-full h-[120px] flex justify-center items-center rounded-md shadow-md p-3 mr-4">
      {isLoading ? (
        <PulseLoader size={15} color="gray" />
      ) : (
        (!following || following.length === 0) && (
          <p>{`You don't have following🙈`}</p>
        )
      )}
      {following && following.length > 0 && (
        <ScrollCarousel>
          {following.map(({ username, image }) => (
            <Link
              key={username}
              className="flex flex-col items-center"
              href={`/user/${username}`}
            >
              <div className="flex justify-center items-center w-[85px] h-[85px] rounded-full border-4 border-gray-500 hover:border-sky-500 ease-in duration-150">
                <Avatar size="w-[70px] h-[70px]" image={image} />
              </div>
              <p>{username}</p>
            </Link>
          ))}
        </ScrollCarousel>
      )}
    </section>
  );
}
