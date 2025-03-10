"use client"; // Indica que este componente roda no lado do cliente
import { signIn } from "next-auth/react"; // Importa a função de login do NextAuth
import { useState } from "react"; // Para gerenciar estados
import { useRouter } from "next/navigation"; // Para redirecionar após o login
import Link from "next/link"; // Para criar links de navegação

export default function LoginPage() {
  // Estados para email, senha e mensagem de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Função que trata o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setError(""); // Limpa erros anteriores

    // Chama a função signIn do NextAuth usando o provedor "credentials"
    const res = await signIn("credentials", {
      redirect: false, // Evita redirecionamento automático
      email,
      password,
    });

    if (res?.error) {
      // Se houver erro, atualiza o estado de erro
      setError("Credenciais inválidas!");
    } else {
      // Se o login for bem-sucedido, redireciona para a página inicial
      router.push("/");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Login</h1>
      {/* Formulário de login */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px"
        }}
      >
        {/* Campo de Email */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado conforme o usuário digita
            required
          />
        </label>
        {/* Campo de Senha */}
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado conforme o usuário digita
            required
          />
        </label>
        {/* Exibe mensagem de erro, se houver */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Botão para enviar o formulário */}
        <button type="submit">Entrar</button>
      </form>
      {/* Link para a página de registro (caso exista) */}
      <p>
        Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
      </p>
    </div>
  );
}
