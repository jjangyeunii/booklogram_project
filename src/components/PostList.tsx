"use client";

import { Simplepost } from "@/model/post";
import { HashLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<Simplepost[]>("/api/posts");
  //   console.log(posts);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="mt-32">
          <HashLoader size={80} color="gray" />
        </div>
      ) : (
        (!posts || posts.length === 0) && <p>{`You don't have posts`}</p>
      )}
      <ul className="w-full mt-8 flex flex-col gap-3">
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostListCard post={post} priority={idx < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
