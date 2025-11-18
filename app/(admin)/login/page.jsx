// app/admin/login/page.jsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";
import GuestNavbar from "@/components/GuestNavbar";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-6xl mx-2">
      <GuestNavbar />
      <LoginForm />
    </div>
  );
}
