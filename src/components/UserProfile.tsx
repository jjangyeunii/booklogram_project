import { ProfileUser } from "@/model/user";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  return <div>{user.username}</div>;
}
