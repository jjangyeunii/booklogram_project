import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: AuthUser;
};

export default function Sidebar({ user: { username, name, image } }: Props) {
  return (
    <section className="py-6 ml-6">
      <div className="flex items-center">
        {image && <Avatar size="w-[60px]-[60px]" image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 my-8">
        About ・ Help ・ Press ・ API ・ Jobs ・ Privacy ・ Terms ・ Location ・
        Language
      </p>
      <p className="font-bold text-sm text-neutral-500">
        @Copyright BOOKLOGRAM from YENJ
      </p>
    </section>
  );
}
