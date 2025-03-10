"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Definição do tipo para um curso
type Curso = {
  id: number;            // Identificador único (gerado automaticamente pelo Supabase)
  titulo: string;        // Título do curso
  descricao: string;     // Descrição do curso
  preco: number;         // Preço do curso
  foto_capa: string;     // URL da foto de capa
};

export default function AdminDashboard() {
  // Estado tipado corretamente: cursos é um array de Curso
  const [cursos, setCursos] = useState<Curso[]>([]);

  // Função para buscar cursos do Supabase via API
  async function fetchCursos() {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        throw new Error("Erro ao buscar cursos");
      }
      // Define que os dados retornados são do tipo Curso[]
      const data: Curso[] = await res.json();
      setCursos(data);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
    }
  }

  // Executa a busca dos cursos quando o componente é montado
  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Painel Admin</h1>
      <h2>Cursos Cadastrados</h2>
      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cursos.map((curso) => (
            <li key={curso.id} style={{ marginBottom: "1rem" }}>
              <strong>{curso.titulo}</strong> - R$ {curso.preco.toFixed(2)}
              <p>{curso.descricao}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Link para a página de Gerenciamento de Cursos Express */}
      <Link href="/admin/cursos/express" legacyBehavior>
        <a style={{ textDecoration: "none", color: "blue" }}>
          Gerenciar Cursos Express
        </a>
      </Link>
    </div>
  );
}
