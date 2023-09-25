import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById } from "@/service/posts";
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
