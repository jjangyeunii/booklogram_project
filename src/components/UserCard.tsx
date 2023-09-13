import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user }: Props) {
  const { username, name, image, following, followers } = user;
  return (
    <section>
      <Avatar image={image} size="w-[78px] h-[78px]" />
      <div>
        <h1>{username}</h1>
        <h2>{name}</h2>
        <p>{`${followers ? followers : "0"} followers ${
          following ? following : "0"
        } following`}</p>
      </div>
    </section>
  );
}
