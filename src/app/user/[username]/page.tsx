import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { ProfileUser } from "@/model/user";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserProfile(username);
  if (!user) notFound();
  return (
    <section className="flex flex-col items-center">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
