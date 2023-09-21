import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsOf } from "@/service/posts";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const booktitle = form.get("booktitle")?.toString();
  const bookauthor = form.get("bookauthor")?.toString();
  const bookshort = form.get("bookshort")?.toString();
  const bookreview = form.get("bookreview")?.toString();
  const file = form.get("file") as Blob;

  if (!booktitle || !bookauthor || !bookshort || !bookreview || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, booktitle, bookauthor, bookshort, bookreview, file) //
    .then((data) => NextResponse.json(data));
}
