"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreventBackToLogin() {
  const router = useRouter();

  useEffect(() => {
    // Replace current history entry dengan yang sama, sehingga halaman login gak ada di history
    router.replace(window.location.pathname);
  }, [router]);

  return null;
}
