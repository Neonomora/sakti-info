"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 menit (dapat diubah sesuai kebutuhan)

export default function LogoutHandler() {
  useEffect(() => {
    let timeoutId;

    const logoutUser = () => {
      alert("Session kamu habis, silakan login kembali.");
      signOut({ callbackUrl: "/login" });
    };

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutUser, SESSION_TIMEOUT);
    };

    // Pasang event listener untuk reset timer saat ada aktivitas user
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    window.addEventListener("scroll", resetTimeout);
    window.addEventListener("click", resetTimeout);

    // Mulai timer saat mount komponen
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
      window.removeEventListener("click", resetTimeout);
    };
  }, []);

  return (
    <Button className="cursor-pointer" variant="destructive" onClick={() => signOut({ callbackUrl: "/login" })}>
      Logout
    </Button>
  );
}
