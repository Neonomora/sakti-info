// middleware.js (letakkan di root project)

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Proteksi semua route /dashboard
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req, secret });

    if (!token) {
      // Kalau gak ada token (belum login), redirect ke login admin
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

