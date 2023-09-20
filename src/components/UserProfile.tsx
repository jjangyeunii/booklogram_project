import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { username, name, image, following, followers, posts } = user;
  return (
    <section className="w-full justify-center my-14 flex flex-col items-center md:flex-row">
      <Avatar image={image} size="w-[150px] h-[150px]" />
      <div className="flex flex-col items-center md:ml-6 md:items-start">
        <div className="flex flex-col items-center my-3 gap-3 md:flex-row">
          <h1 className="text-2xl">{username}</h1>
          <FollowButton user={user} />
        </div>
        <p className="text-neutral-500">{`${posts} ${
          posts <= 1 ? "post" : "posts"
        } ${following} following ${followers} followers`}</p>
        <h2 className="my-3 text-xl font-bold">{name}</h2>
      </div>
    </section>
  );
}
