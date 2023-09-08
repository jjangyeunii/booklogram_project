"use client";

import useSWR from "swr";

export default function Followingbar() {
  const { data, isLoading } = useSWR("/api/me");
  //   console.log(data);
  return <div>Followingbars</div>;
}
