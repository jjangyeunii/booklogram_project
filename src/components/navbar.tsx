"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav>
      <header>Booklogram</header>
      <section>
        <Link href="/">
          <AiOutlineHome />
        </Link>
        <Link href="/search">
          <RiSearchLine />
        </Link>
        <Link href="/new">
          <BsPlusSquare />
        </Link>
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link href="/auth/signin">Sign in</Link>
        )}
      </section>
    </nav>
  );
}
