"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const OAuth_style = [
  { id: "google", icons: <FcGoogle />, color: "border-sky-500" },
  { id: "github", icons: <FaGithub />, color: "border-gray-400" },
  {
    id: "kakao",
    icons: <RiKakaoTalkFill size={24} />,
    color: "border-yellow-300",
  },
  { id: "naver", icons: <SiNaver size={16} />, color: "border-green-500" },
];

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <section className="flex flex-col m-7 gap-5">
      {Object.values(providers).map(({ id, name }) => (
        <button
          className={`flex justify-center items-center gap-2 text-xl rounded-md border-2 py-3 px-6 ${
            OAuth_style.find((el) => el.id === id)?.color
          } hover:shadow-md`}
          key={id}
          onClick={() => signIn(id, { callbackUrl })}
        >
          {OAuth_style.find((el) => el.id === id)?.icons}
          {`Sign in with ${name}`}
        </button>
      ))}
    </section>
  );
}
