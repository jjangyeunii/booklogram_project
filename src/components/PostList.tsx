"use client";

import { HashLoader } from "react-spinners";
import PostListCard from "./PostListCard";
import usePosts from "@/hooks/posts";

export default function PostList() {
  const { posts, isLoading } = usePosts();
  return (
    <section className="w-full flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="mt-32">
          <HashLoader size={80} color="gray" />
        </div>
      ) : (
        (!posts || posts.length === 0) && <p>{`You don't have posts`}</p>
      )}
      <ul className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
