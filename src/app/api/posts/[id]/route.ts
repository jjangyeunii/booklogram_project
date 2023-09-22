import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/service/posts";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPostById(context.params.id).then((data) => NextResponse.json(data))
  );
}
