"use client"; // Este componente roda no lado do cliente
import { useState } from "react"; // Para gerenciar estados
import { useRouter } from "next/navigation"; // Para redirecionamento após o registro
import Link from "next/link"; // Para criar links de navegação

export default function SignupPage() {
  // Estados para nome, email, senha e mensagem de erro
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Função que trata o envio do formulário de registro
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    setError(""); // Limpa erros anteriores

    // Aqui você implementaria a lógica para registrar o usuário (ex.: salvar em um banco de dados)
    // Neste exemplo, vamos apenas redirecionar o usuário para a página de login
    router.push("/login");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Registro</h1>
      {/* Formulário de registro */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px"
        }}
      >
        {/* Campo de Nome */}
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        {/* Campo de Email */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* Campo de Senha */}
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Botão para enviar o formulário */}
        <button type="submit">Registrar</button>
      </form>
      {/* Link para a página de login */}
      <p>
        Já tem uma conta? <Link href="/login">Faça login</Link>
      </p>
    </div>
  );
}
