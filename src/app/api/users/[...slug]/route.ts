import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    throw new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "liked") {
    request = getLikedPostsOf;
  } else if (query === "saved") {
    request = getSavedPostsOf;
  }
  return request(username).then((data) => NextResponse.json(data));
}
