"use client";

import { useState } from "react";
import useSWR from "swr";

export default function SearchUser() {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading } = useSWR(`/api/search/${keyword}`);
  //   console.log(data);
  return <div>search user</div>;
}
