import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Followingbar from "@/components/Followingbar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }
  // console.log(session);
  return (
    <section className="w-full flex flex-col md:flex-row px-6">
      <div className="w-full flex flex-col items-center basis-3/4 py-6">
        <Followingbar />
      </div>
      <div className="basis-1/4">
        <Sidebar user={user} />
      </div>
    </section>
  );
}
