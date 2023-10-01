"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";

const SIGN_BUTTON_CLASS =
  "bg-sky-500 text-white px-2 py-1 rounded-md hover:bg-sky-400";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <nav className="flex justify-between items-center px-6">
      <h1 className="text-3xl font-bold">Booklogram</h1>
      <section className="flex items-center gap-3">
        <Link href="/">
          <AiOutlineHome size={24} />
        </Link>
        <Link href="/search">
          <RiSearchLine size={24} />
        </Link>
        <Link href="/new">
          <BsPlusSquare size={24} />
        </Link>
        {user && (
          <Link href={`/user/${user.username}`}>
            <Avatar size="w-[38px] h-[38px]" image={user.image} />
          </Link>
        )}
        {session ? (
          <button className={SIGN_BUTTON_CLASS} onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <Link href="/auth/signin" className={SIGN_BUTTON_CLASS}>
            Sign in
          </Link>
        )}
      </section>
    </nav>
  );
}
