import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UpdatePost from "@/components/UpdatePost";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  params: {
    postId: string;
  };
};

export default async function UpdatePostPage({ params: { postId } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("auth/signin");
  }
  return <UpdatePost user={session.user} postId={postId} />;
}
