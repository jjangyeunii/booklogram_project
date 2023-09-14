import { SearchResultUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: SearchResultUser;
};

export default function UserCard({ user }: Props) {
  const { username, name, image, following, followers } = user;
  return (
    <section className="flex items-center p-5 mx-48 border border-neutral-600 bg-white hover:bg-neutral-50">
      <Avatar image={image} size="w-[85px] h-[85px]" />
      <div className="flex flex-col ml-4">
        <h1 className="font-bold text-xl">{username}</h1>
        <h2 className="text-xl text-neutral-500">{name}</h2>
        <p className="text-neutral-500">{`${
          followers ? followers : "0"
        } followers ${following ? following : "0"} following`}</p>
      </div>
    </section>
  );
}
