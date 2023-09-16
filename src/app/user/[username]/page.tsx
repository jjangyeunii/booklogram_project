import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { ProfileUser } from "@/model/user";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import { cache } from "react";

export const dynamic = "force-dynamic";

type Props = {
  params: { username: string };
};

const getUser = cache(async (username: string) => getUserProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);
  if (!user) notFound();
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
