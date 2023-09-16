import { FadeLoader } from "react-spinners";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();
  // console.log(posts);
  return (
    <section className="w-full text-center">
      {isLoading && (
        <div className="w-full flex justify-center mt-24">
          <FadeLoader color="gray" />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-2 py-4 px-8">
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={idx < 6} />
            </li>
          ))}
      </ul>
    </section>
  );
}
