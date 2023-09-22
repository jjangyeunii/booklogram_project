import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsOf } from "@/service/posts";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async (user) =>
    getFollowingPostsOf(user.username).then((data) => NextResponse.json(data))
  );
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const booktitle = form.get("booktitle")?.toString();
    const bookauthor = form.get("bookauthor")?.toString();
    const bookshort = form.get("bookshort")?.toString();
    const bookreview = form.get("bookreview")?.toString();
    const file = form.get("file") as Blob;

    if (!booktitle || !bookauthor || !bookshort || !bookreview || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    return createPost(
      user.id,
      booktitle,
      bookauthor,
      bookshort,
      bookreview,
      file
    ) //
      .then((data) => NextResponse.json(data));
  });
}
