"use client"; // Este componente roda no lado do cliente
import Link from "next/link";
import { useEffect, useState } from "react";

// Define o tipo de dados para cada curso
type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  // 'categoria' pode ser "completo" para cursos completos ou "express" para os cursos rápidos (Bancada Express)
  categoria: "completo" | "express";
};

export default function Cursos() {
  // Estado para armazenar os cursos
  const [cursos, setCursos] = useState<Curso[]>([]);
  // Estado para controlar se os dados estão sendo carregados
  const [loading, setLoading] = useState(true);

  // Simula a obtenção de dados (substitua por uma chamada à sua API quando necessário)
  useEffect(() => {
    setTimeout(() => {
      setCursos([
        // Exemplo de cursos completos
        {
          id: 1,
          titulo: "Curso Completo de Node.js",
          descricao: "Aprenda Node.js do básico ao avançado com conteúdo completo.",
          preco: 99.9,
          categoria: "completo",
        },
        {
          id: 2,
          titulo: "Curso Completo de React",
          descricao: "Domine o React e crie interfaces dinâmicas.",
          preco: 120,
          categoria: "completo",
        },
        // Exemplo de cursos express (Bancada Express)
        {
          id: 3,
          titulo: "Bancada Express: Aprenda Linux",
          descricao: "Introdução rápida ao mundo do Linux para você testar se é a área para você.",
          preco: 19.9,
          categoria: "express",
        },
        {
          id: 4,
          titulo: "Bancada Express: Aprenda Docker",
          descricao: "Conceitos básicos de Docker e containerização de forma rápida.",
          preco: 19.9,
          categoria: "express",
        },
        {
          id: 5,
          titulo: "Bancada Express: Aprenda Zabbix",
          descricao: "Curso express para começar a monitorar sistemas com Zabbix.",
          preco: 19.9,
          categoria: "express",
        },
        {
          id: 6,
          titulo: "Bancada Express: Aprenda GitHub",
          descricao: "Aprenda a usar o GitHub para versionamento de código e colaboração.",
          preco: 19.9,
          categoria: "express",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtra os cursos por categoria
  const cursosCompletos = cursos.filter((curso) => curso.categoria === "completo");
  const cursosExpress = cursos.filter((curso) => curso.categoria === "express");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Cursos e Mentorias</h1>
      {loading ? (
        <p>Carregando cursos...</p>
      ) : (
        <>
          {/* Seção de cursos completos */}
          <h2>Cursos Completos</h2>
          <ul>
            {cursosCompletos.map((curso) => (
              <li key={curso.id} style={{ marginBottom: "1rem" }}>
                <h3>
                  {curso.titulo} - R$ {curso.preco.toFixed(2)}
                </h3>
                <p>{curso.descricao}</p>
              </li>
            ))}
          </ul>
          {/* Seção de cursos express, agora rebatizados como "Bancada Express" */}
          <h2>Bancada Express</h2>
          <p>Confira nossos cursos express para testar e aprender de forma rápida!</p>
          <ul>
            {cursosExpress.map((curso) => (
              <li key={curso.id} style={{ marginBottom: "1rem" }}>
                <h3>
                  {curso.titulo} - R$ {curso.preco.toFixed(2)}
                </h3>
                <p>{curso.descricao}</p>
              </li>
            ))}
          </ul>
          {/* Botão placeholder para inserir um novo curso express */}
          <button
            onClick={() =>
              alert("Funcionalidade para inserir curso express em desenvolvimento!")
            }
          >
            Inserir Novo Curso Express
          </button>
        </>
      )}
      {/* Link para voltar à Home */}
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}
