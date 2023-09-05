import "./globals.css";
import type { Metadata } from "next";
import AuthContext from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto py-3">
              <Navbar />
            </div>
          </header>
          <main className="max-w-screen-xl mx-auto">{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
