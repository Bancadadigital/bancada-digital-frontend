import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Lógica de autorização aqui
        if (credentials?.email === "teste@example.com" && credentials.password === "senha") {
          return { id: 1, name: "Teste", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
