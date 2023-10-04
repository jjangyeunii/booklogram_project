"use client";

import Link from "next/link";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { usePathname } from "next/navigation";

const SIGN_BUTTON_CLASS =
  "bg-sky-500 text-white px-2 py-1 rounded-md hover:bg-sky-400";

const menu = [
  {
    path: "/",
    icon: <AiOutlineHome size={24} />,
    clickedIcon: <AiFillHome size={24} />,
    title: "Home",
  },
  {
    path: "/search",
    icon: <RiSearchLine size={24} />,
    clickedIcon: <RiSearchFill size={24} />,
    title: "Search",
  },
  {
    path: "/new",
    icon: <BsPlusSquare size={24} />,
    clickedIcon: <BsPlusSquareFill size={24} />,
    title: "New",
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <nav className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Booklogram</h1>
      </Link>
      <ul className="flex items-center gap-3">
        {menu.map(({ path, icon, clickedIcon, title }) => (
          <li key={title}>
            <Link href={path}>{pathName === path ? clickedIcon : icon}</Link>
          </li>
        ))}
        {user && (
          <li>
            <Link href={`/user/${user.username}`}>
              <Avatar size="w-[38px] h-[38px]" image={user.image} />
            </Link>
          </li>
        )}
        {session ? (
          <li>
            <button className={SIGN_BUTTON_CLASS} onClick={() => signOut()}>
              Sign out
            </button>
          </li>
        ) : (
          <li>
            <Link href="/auth/signin" className={SIGN_BUTTON_CLASS}>
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
