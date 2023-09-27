import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/service/posts";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPostById(context.params.id).then((data) => NextResponse.json(data))
  );
}

export async function DELETE(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    deletePost(context.params.id).then(() =>
      NextResponse.json({ success: true }, { status: 200 })
    )
  );
}

export async function PATCH(req: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    const { title, author, short, review } = await req.json();
    if (
      title === null ||
      author === null ||
      short === null ||
      review === null
    ) {
      return new Response("Bad Request", { status: 400 });
    }
    return updatePost(context.params.id, user.id, title, author, review, short)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
