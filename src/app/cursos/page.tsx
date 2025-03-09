"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define um tipo para representar um curso.
// O campo "preco" é opcional e "categoria" serve para identificar cursos rápidos.
type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco?: number;
  categoria?: string;
};

export default function Cursos() {
  // Estado para armazenar a lista de cursos
  const [cursos, setCursos] = useState<Curso[]>([]);
  // Estado para indicar se os dados estão sendo carregados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula a requisição de dados com um delay
    setTimeout(() => {
      setCursos([
        // Cursos completos (exemplos)
        { id: 1, titulo: "Curso de Node.js", descricao: "Aprenda Node.js do básico ao avançado", preco: 99.90 },
        { id: 2, titulo: "Curso de React", descricao: "Construindo interfaces com React", preco: 120.00 },
        { id: 3, titulo: "Mentoria de Desenvolvimento", descricao: "Sessões de mentoria para acelerar sua carreira", preco: 150.00 },
        // Cursos rápidos (categoria "rapido")
        { id: 4, titulo: "Curso Rápido de Testes", descricao: "Curso introdutório para você testar se o assunto agrada", preco: 19.90, categoria: "rapido" },
        { id: 5, titulo: "Mini Curso de UX", descricao: "Introdução rápida aos fundamentos de UX", preco: 10.00, categoria: "rapido" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtra os cursos rápidos
  const cursosRapidos = cursos.filter(curso => curso.categoria === "rapido");

  // Filtra os cursos completos
  const cursosCompletos = cursos.filter(curso => !curso.categoria);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Cursos e Mentorias</h1>
      {loading ? (
        <p>Carregando cursos...</p>
      ) : (
        <>
          <h2>Cursos Completos</h2>
          <ul>
            {cursosCompletos.map((curso) => (
              <li key={curso.id}>
                <h3>
                  {curso.titulo} - R$ {curso.preco?.toFixed(2)}
                </h3>
                <p>{curso.descricao}</p>
              </li>
            ))}
          </ul>
          <h2>Cursos Rápidos (Teste)</h2>
          <ul>
            {cursosRapidos.map((curso) => (
              <li key={curso.id}>
                <h3>
                  {curso.titulo} - R$ {curso.preco?.toFixed(2)}
                </h3>
                <p>{curso.descricao}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link href="/">Voltar para a Home</Link>
    </div>
  );
}
