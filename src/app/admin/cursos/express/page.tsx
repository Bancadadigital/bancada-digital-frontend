"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Definição do tipo do curso express
type ExpressCourse = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  rating: number;
  foto_capa: string;
};

export default function ManageExpressCourses() {
  const [courses, setCourses] = useState<ExpressCourse[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [rating, setRating] = useState(0);
  const [fotoCapa, setFotoCapa] = useState("");

  // Buscar cursos do Supabase via API
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Erro: Resposta inesperada da API", data);
        }
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }
    fetchCourses();
  }, []);

  // Função para adicionar um novo curso no Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCourse = {
      titulo,
      descricao,
      preco,
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

      const data = await res.json();
      if (res.ok) {
        setCourses([...courses, data.data[0]]);
        setTitulo("");
        setDescricao("");
        setPreco(0);
        setRating(0);
        setFotoCapa("");
      } else {
        console.error("Erro ao criar curso:", data.error);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Função para deletar um curso
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/courses?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        console.error("Erro ao excluir curso.");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Gerenciar Bancada Express</h1>
      <p>Adicione novos cursos express e gerencie os existentes.</p>

      {/* Formulário para adicionar cursos */}
      <form
        onSubmit={handleSubmit}
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
            onChange={(e) => setPreco(Number(e.target.value))}
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
          />
        </label>
        <button type="submit">Adicionar Curso Express</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Lista de Cursos Express</h2>
      {courses.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "1rem" }}>
              {course.foto_capa && (
                <img
                  src={course.foto_capa}
                  alt={`Capa do curso ${course.titulo}`}
                  style={{ width: "200px", display: "block", marginBottom: "0.5rem" }}
                />
              )}
              <strong>{course.titulo}</strong> - R$ {course.preco.toFixed(2)} - ⭐ {course.rating}
              <p>{course.descricao}</p>
              <button onClick={() => handleDelete(course.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

      {/* Link para voltar ao Dashboard */}
      <Link href="/admin" legacyBehavior>
        <a style={{ textDecoration: "none", color: "blue" }}>Voltar ao Dashboard</a>
      </Link>
    </div>
  );
}
