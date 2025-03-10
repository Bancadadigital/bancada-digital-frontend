"use client"; // Este componente roda no lado do cliente
import { useState } from "react";
import Link from "next/link";

// Define o tipo para um curso express
type ExpressCourse = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  // Usaremos sempre o mesmo priceId para todos os cursos express
  priceId: string;
};

export default function BancadaExpress() {
  // Simulação de dados estáticos para os cursos express
  const [courses] = useState<ExpressCourse[]>([
    {
      id: 1,
      titulo: "Aprenda Linux em 7 Dias",
      descricao: "Domine o básico do Linux em apenas 7 dias e descubra se essa área é para você.",
      preco: 19.9,
      priceId: "price_1R0tEsJJV3Ij9mdUBptl4W7i", // ID de preço para cursos express
    },
    {
      id: 2,
      titulo: "Aprenda Docker em 7 Dias",
      descricao: "Aprenda a containerizar aplicações com Docker de forma prática em apenas 7 dias.",
      preco: 19.9,
      priceId: "price_1R0tEsJJV3Ij9mdUBptl4W7i",
    },
    {
      id: 3,
      titulo: "Aprenda Zabbix em 7 Dias",
      descricao: "Uma introdução rápida ao monitoramento de sistemas com Zabbix para você começar a dominar a ferramenta.",
      preco: 19.9,
      priceId: "price_1R0tEsJJV3Ij9mdUBptl4W7i",
    },
    {
      id: 4,
      titulo: "Aprenda GitHub em 7 Dias",
      descricao: "Aprenda a usar o GitHub para versionamento de código e colaboração, acelerando seu aprendizado em apenas 7 dias.",
      preco: 19.9,
      priceId: "price_1R0tEsJJV3Ij9mdUBptl4W7i",
    },
  ]);

  // Estado para mensagens e carregamento
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  // Função que inicia o fluxo de pagamento para um curso
  const iniciarPagamento = async (priceId: string) => {
    setLoading(true);
    try {
      // Envia o priceId para o endpoint de pagamento
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.sessionUrl) {
        // Redireciona para a sessão de checkout do Stripe
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

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Bancada Express</h1>
      <p>
        Experimente nossos cursos express para aprender rapidamente um assunto em
        7 dias!
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li
            key={course.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <h2>{course.titulo}</h2>
            <p>{course.descricao}</p>
            <p>
              Preço: R$ {course.preco.toFixed(2)}
            </p>
            <button
              disabled={loading}
              onClick={() => iniciarPagamento(course.priceId)}
            >
              {loading ? "Processando..." : "Comprar"}
            </button>
          </li>
        ))}
      </ul>
      {mensagem && <p>{mensagem}</p>}
      <Link href="/" legacyBehavior>
        <a style={{ textDecoration: "none", color: "blue" }}>
          Voltar para a Home
        </a>
      </Link>
    </div>
  );
}
