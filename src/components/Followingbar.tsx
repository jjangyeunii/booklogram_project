"use client";

import useSWR from "swr";
import { PulseLoader } from "react-spinners";
import { DetailUser } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";

export default function Followingbar() {
  const { data, isLoading } = useSWR<DetailUser>("/api/me");
  const following = data?.following;
  //   console.log(data);
  return (
    <section className="w-3/4 h-[120px] flex justify-center items-center rounded-md shadow-md py-3">
      {isLoading ? (
        <PulseLoader size={15} color="gray" />
      ) : (
        (!following || following.length === 0) && (
          <p>{`You don't have following🙈`}</p>
        )
      )}
      {following && following.length > 0 && (
        <ul className="w-full flex justify-evenly">
          {following.map(({ username, image }) => (
            <li key={username}>
              <Link
                className="flex flex-col items-center"
                href={`/user/${username}`}
              >
                <div className="flex justify-center items-center w-[85px] h-[85px] rounded-full border-4 border-gray-500 hover:border-sky-500 ease-in duration-150">
                  <Avatar size="w-[70px] h-[70px]" image={image} />
                </div>
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
