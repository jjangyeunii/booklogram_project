"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import { GrGrid } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { RiBookmarkLine } from "react-icons/ri";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <GrGrid /> },
  { type: "liked", icon: <AiOutlineHeart /> },
  { type: "liked", icon: <RiBookmarkLine /> },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);
  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <p>{type}</p>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
