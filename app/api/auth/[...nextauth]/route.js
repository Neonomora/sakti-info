import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB} from "@/lib/mongoose";
import Admin from "@/models/admin/Admin";
import { compare } from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 jam
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const admin = await Admin.findOne({ username: credentials.username });
        if (!admin) {
          throw new Error("Username tidak ditemukan");
        }

        const isValid = await compare(credentials.password, admin.password);
        if (!isValid) {
          throw new Error("Password salah");
        }

        return {
          id: admin._id.toString(),
          name: admin.name || admin.username,
          username: admin.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
