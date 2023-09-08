import { AuthUser } from "@/model/user";

type Props = {
  user: AuthUser;
};

export default function Sidebar({ user: { username, name, image } }: Props) {
  return <div></div>;
}
