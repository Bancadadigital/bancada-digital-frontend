"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Definição do tipo para um curso express
type ExpressCourse = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  rating: number;
  foto_capa: string;
};

export default function ManageExpressCourses() {
  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [rating, setRating] = useState(0);
  const [fotoCapa, setFotoCapa] = useState("");
  // Estado para armazenar a lista de cursos (tipado corretamente)
  const [cursos, setCursos] = useState<ExpressCourse[]>([]);
  // Estados para loading e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os cursos do Supabase via API
  async function fetchCourses() {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Erro ao buscar cursos");
      const data: ExpressCourse[] = await res.json();
      setCursos(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar cursos:", err);
      setError("Erro ao carregar cursos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Executa a busca de cursos ao montar o componente
  useEffect(() => {
    fetchCourses();
  }, []);

  // Função para adicionar um novo curso via API
  async function handleAdicionarCurso(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Cria o objeto com os dados do novo curso
    const newCourse = {
      titulo,
      descricao,
      preco: parseFloat(preco),
      rating,
      foto_capa: fotoCapa,
    };

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) throw new Error("Erro ao adicionar curso.");

      // Atualiza a lista de cursos após a inserção
      await fetchCourses();

      alert("Curso adicionado com sucesso!");
      // Limpa os campos do formulário
      setTitulo("");
      setDescricao("");
      setPreco("");
      setRating(0);
      setFotoCapa("");
    } catch (err) {
      console.error("Erro ao adicionar curso:", err);
      alert("Erro ao adicionar curso.");
    }
  }

  // Função para deletar um curso (caso implementado no backend)
  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/courses?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCursos(cursos.filter((course) => course.id !== id));
      } else {
        console.error("Erro ao excluir curso.");
      }
    } catch (err) {
      console.error("Erro na requisição de exclusão:", err);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Painel Admin - Adicionar Curso Express</h1>
      <form
        onSubmit={handleAdicionarCurso}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Preço (R$):
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </label>
        <label>
          Classificação (1 a 5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Foto de Capa (URL):
          <input
            type="text"
            value={fotoCapa}
            onChange={(e) => setFotoCapa(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            required
          />
        </label>
        <button type="submit">Adicionar Curso Express</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Cursos Existentes</h2>
      {loading && <p>Carregando cursos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {(!loading && cursos.length === 0) ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cursos.map((course) => (
            <li key={course.id} style={{ marginBottom: "1rem" }}>
              {course.foto_capa && (
                <Image
                  src={course.foto_capa}
                  alt={`Capa do curso ${course.titulo}`}
                  width={200}
                  height={150}
                  style={{ display: "block", marginBottom: "0.5rem" }}
                />
              )}
              <strong>{course.titulo}</strong> - R$ {course.preco.toFixed(2)} - ⭐ {course.rating}
              <p>{course.descricao}</p>
              <button onClick={() => handleDelete(course.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

      <Link href="/admin" legacyBehavior>
        <a style={{ textDecoration: "none", color: "blue" }}>Voltar ao Dashboard</a>
      </Link>
    </div>
  );
}
