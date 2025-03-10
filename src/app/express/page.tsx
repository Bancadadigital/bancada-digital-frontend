"use client"; // Esse componente roda no lado do cliente
import { useState, useEffect } from "react";
import Link from "next/link";

// Define o tipo de cada curso express
type ExpressCourse = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  rating: number;
  foto_capa: string;
};

export default function BancadaExpressPage() {
  // Estado para armazenar os cursos
  const [cursos, setCursos] = useState<ExpressCourse[]>([]);
  // Estado para indicar se os dados estão sendo carregados
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // Busca os cursos do endpoint GET /api/courses assim que a página carrega
  useEffect(() => {
    async function fetchCursos() {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) {
          throw new Error("Falha ao buscar cursos.");
        }
        const data = await res.json();
        setCursos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCursos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Bancada Express - Aprenda em 7 Dias</h1>
      
      {loading && <p>Carregando cursos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && cursos.length === 0 ? (
        <p>Nenhum curso disponível no momento.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cursos.map((curso) => (
            <li
              key={curso.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              {/* Exibe a foto de capa, se houver */}
              {curso.foto_capa && (
                <img
                  src={curso.foto_capa}
                  alt={`Capa de ${curso.titulo}`}
                  style={{ width: "200px", marginBottom: "0.5rem" }}
                />
              )}
              <h2>{curso.titulo}</h2>
              <p>{curso.descricao}</p>
              <p>
                Preço: R$ {curso.preco.toFixed(2)} - Classificação: {curso.rating} ⭐
              </p>
              {/* Link para a página de detalhes do curso */}
              <Link href={`/express/${curso.id}`} legacyBehavior>
                <a style={{ textDecoration: "none", color: "blue" }}>
                  Ver Detalhes
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* Link para voltar à Home */}
      <Link href="/" legacyBehavior>
        <a style={{ textDecoration: "none", color: "blue" }}>
          Voltar para a Home
        </a>
      </Link>
    </div>
  );
}
