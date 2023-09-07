import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <section className="w-full flex flex-col md:flex-row px-6">
      <div className="w-full basis-3/4">Following & Post</div>
      <div className="basis-1/4">Sidebar</div>
    </section>
  );
}
