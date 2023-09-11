"use client";

import { Simplepost } from "@/model/post";
import useSWR from "swr";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<Simplepost[]>("/api/posts");
  console.log(posts);
  return <div></div>;
}
