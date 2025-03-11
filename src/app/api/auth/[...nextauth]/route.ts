import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        // TODO: substituir por autenticação real no Supabase futuramente
        if (email === "teste@example.com" && password === "senha") {
          return { id: "1", name: "Usuário", email };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const },

  callbacks: {
    jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Exportação correta exigida pelo App Router
export { handler as GET, handler as POST };
