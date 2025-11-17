import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LogoutHandler from "./LogoutHandler";
import PreventBackToLogin from "./PreventBackToLogin";

import { Card, CardTitle, CardContent } from "@/components/ui/card"; 

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Anda harus login untuk mengakses halaman ini.
        </h2>
        <Link href="/login" className="text-blue-500 hover:underline">
          Ke halaman login
        </Link>
      </div>
    );
  }

  const menuItems = [
    { title: "Album", href: "/dashboard/album" },
    { title: "Class", href: "/dashboard/class" },
    { title: "Event", href: "/dashboard/event" },
    { title: "News", href: "/dashboard/news" },
    { title: "UKM", href: "/dashboard/ukm" },
    {
      title: "Notification",
      href: "/dashboard/notification",
    },
  ];

  return (
    <div className="max-w-6xl mx-6">
      <PreventBackToLogin />
      <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
      <h2 className="text-lg mb-6">Selamat datang, {session.user.name}!</h2>

      <main>
        <h2 className="text-xl font-semibold mb-4">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.href}
              className={`h-20 bg-white hover:shadow-md transition-shadow`}
            >
              <Link href={item.href} className="h-full block">
                <CardContent className="p-4 h-full flex items-center justify-center">
                  <CardTitle className="text-center text-xl text-gray-900 font-semibold">
                    {item.title}
                  </CardTitle>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <div className="mt-8">
        <LogoutHandler />
      </div>
    </div>
  );
}
