// Importa o NextAuth e o provedor de credenciais
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuração do NextAuth
const authOptions = {
  // Define o provedor de autenticação via credenciais
  providers: [
    CredentialsProvider({
      name: "Credentials", // Nome que será exibido
      // Campos que serão solicitados para o login
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Senha", type: "password" }
      },
      // Função que valida as credenciais do usuário
      async authorize(credentials) {
        // Exemplo simples: se email e senha não estiverem vazios, autoriza o usuário
        if (credentials?.email && credentials?.password) {
          // Retorna um objeto de usuário básico (em um cenário real, valide com um banco de dados)
          return { id: "1", name: "Usuário Teste", email: credentials.email };
        }
        // Se as credenciais forem inválidas, retorna null
        return null;
      }
    })
  ],
  // Configuração para usar JWT na sessão
  session: { strategy: "jwt" }
};

// Cria o handler do NextAuth
const handler = NextAuth(authOptions);

// Exporta o handler para os métodos GET e POST
export { handler as GET, handler as POST };
