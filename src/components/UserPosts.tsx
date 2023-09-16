"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import { GrGrid } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <GrGrid /> },
  { type: "liked", icon: <AiOutlineHeart /> },
  { type: "saved", icon: <RiBookmarkLine /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);
  return (
    <section className="border-t border-neutral-300">
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => (
          <li
            className={`flex items-center mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button>{icon}</button>
            <p className="hidden md:inline md:ml-3">{type}</p>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
