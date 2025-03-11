import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Substitua aqui pela sua lógica real de autenticação
        if (
          credentials?.email === "teste@example.com" &&
          credentials.password === "senha"
        ) {
          return {
            id: "1",
            name: "Usuário",
            email: credentials.email,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
export const { GET, POST } = handlers;
