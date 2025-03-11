import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Substitua essa lógica por sua autenticação real posteriormente
        if (
          credentials?.email === "teste@example.com" &&
          credentials.password === "senha"
        ) {
          return { id: "1", name: "Usuário", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

// Exportações corretas para App Router
export { handler as GET, handler as POST };
