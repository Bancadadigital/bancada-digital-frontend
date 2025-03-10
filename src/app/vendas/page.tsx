"use client"; // Este componente roda no lado do cliente
import { useState } from "react";
import Link from "next/link";

export default function Vendas() {
  // Estados para armazenar os dados do formulário e controle do fluxo de pagamento
  const [nome, setNome] = useState("");               // Nome do usuário
  const [email, setEmail] = useState("");             // Email do usuário
  // Estado para o produto, utilizando o ID de preço do Stripe para compra única ou assinatura mensal
  // Aqui, usamos "price_1R0q1GJJV3Ij9mdU8ZAVPmpc" para a compra única,
  // e "price_1R0pVvJJV3Ij9mdU6bt9Qpr3" para a assinatura mensal.
  const [produto, setProduto] = useState("price_1R0q1GJJV3Ij9mdU8ZAVPmpc");
  const [mensagem, setMensagem] = useState("");         // Mensagem de feedback para o usuário
  const [loading, setLoading] = useState(false);        // Indicador de carregamento

  // Função que inicia o pagamento chamando o endpoint de pagamento
  const iniciarPagamento = async () => {
    setLoading(true);
    try {
      // Envia o priceId selecionado para o endpoint /api/payment
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: produto }),
      });
      const data = await res.json();

      // Se a sessão de checkout for criada, redireciona o usuário para a URL do Stripe
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        setMensagem("Erro ao iniciar o pagamento.");
      }
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
      setMensagem("Erro ao iniciar o pagamento.");
    }
    setLoading(false);
  };

  // Função para tratar o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    iniciarPagamento();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Página de Vendas</h1>
      <p>Realize sua compra e comece a aprender!</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        {/* Campo para o Nome */}
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        {/* Campo para o Email */}
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
          <select value={produto} onChange={(e) => setProduto(e.target.value)}>
            {/* Opção para compra única, com o ID de preço atualizado */}
            <option value="price_1R0q1GJJV3Ij9mdU8ZAVPmpc">
              Curso de Node.js - Compra Única - R$99,90
            </option>
            {/* Opção para assinatura mensal */}
            <option value="price_1R0pVvJJV3Ij9mdU6bt9Qpr3">
              Curso de Node.js - Assinatura Mensal - R$19,90
            </option>
            {/* Você pode adicionar outras opções conforme necessário */}
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Processando..." : "Comprar"}
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}
