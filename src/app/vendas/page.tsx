"use client";
import { useState } from "react";
import Link from "next/link";

// Página de Vendas: Simula um formulário de checkout para comprar cursos/mentorias
export default function Vendas() {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [produto, setProduto] = useState("Curso de Node.js");
  const [mensagem, setMensagem] = useState("");

  // Função para tratar o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode fazer uma requisição para processar o pagamento
    // Neste exemplo, apenas simulamos o envio e mostramos uma mensagem de sucesso
    setMensagem(
      `Obrigado, ${nome}! Seu pedido para "${produto}" foi recebido. Em breve, enviaremos mais detalhes para ${email}.`
    );
    // Opcional: Limpar os campos do formulário
    setNome("");
    setEmail("");
    setProduto("Curso de Node.js");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Página de Vendas</h1>
      <p>Realize sua compra e comece a aprender!</p>
      {/* Formulário de Checkout */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
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
        {/* Seletor de Produto */}
        <label>
          Produto:
          <select
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          >
            <option value="Curso de Node.js">Curso de Node.js</option>
            <option value="Curso de React">Curso de React</option>
            <option value="Mentoria de Desenvolvimento">
              Mentoria de Desenvolvimento
            </option>
          </select>
        </label>
        {/* Botão de Envio */}
        <button type="submit">Comprar</button>
      </form>
      {/* Exibe mensagem de confirmação caso exista */}
      {mensagem && <p>{mensagem}</p>}
      {/* Link para voltar à Home */}
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}
