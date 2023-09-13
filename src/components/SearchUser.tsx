"use client";

import { ProfileUser } from "@/model/user";
import { ChangeEvent, FormEvent, useState } from "react";
import { HashLoader } from "react-spinners";
import useSWR from "swr";
import UserCard from "./UserCard";

export default function SearchUser() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);
  // console.log(users);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col items-center">
      <form
        className="w-3/4 border border-neutral-500 my-6"
        onSubmit={onSubmit}
      >
        <input
          className="w-full p-5 text-2xl outline-none"
          type="text"
          placeholder="Search for a username or name"
          autoFocus
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        />
      </form>
      {error && <p>사용자 찾기에 오류가 발생했음 😜</p>}
      {isLoading && (
        <div>
          <HashLoader size={80} color="gray" />
        </div>
      )}
      {!isLoading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없음 🧐</p>
      )}
      <section className="w-full flex flex-col gap-3">
        {users &&
          users.map((user) => <UserCard key={user.username} user={user} />)}
      </section>
    </section>
  );
}
