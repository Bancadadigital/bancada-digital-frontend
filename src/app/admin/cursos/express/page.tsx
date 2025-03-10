"use client"; // Roda no lado do cliente
import { useState, useEffect } from "react";
import Link from "next/link";

// Define o tipo para um curso express, agora com um campo para a foto de capa (cover image)
type ExpressCourse = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  rating: number; // Classificação de 1 a 5
  fotoCapa: string; // URL da foto de capa do curso
};

export default function ManageExpressCourses() {
  // Estado para armazenar a lista de cursos express
  const [courses, setCourses] = useState<ExpressCourse[]>([]);
  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [rating, setRating] = useState(0);
  const [fotoCapa, setFotoCapa] = useState(""); // Novo estado para a foto de capa

  // Carrega os cursos do localStorage na montagem do componente
  useEffect(() => {
    const storedCourses = localStorage.getItem("coursesExpress");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  // Atualiza o localStorage sempre que a lista de cursos mudar
  useEffect(() => {
    localStorage.setItem("coursesExpress", JSON.stringify(courses));
  }, [courses]);

  // Função para tratar o envio do formulário para adicionar um novo curso express
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Cria um novo curso express com um ID gerado com base na lista atual
    const newCourse: ExpressCourse = {
      id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
      titulo,
      descricao,
      preco,
      rating,
      fotoCapa, // Define a foto de capa do curso
    };

    // Adiciona o novo curso à lista
    setCourses([...courses, newCourse]);

    // Limpa os campos do formulário
    setTitulo("");
    setDescricao("");
    setPreco(0);
    setRating(0);
    setFotoCapa("");
  };

  // Função para remover um curso da lista
  const handleDelete = (id: number) => {
    const filtered = courses.filter((course) => course.id !== id);
    setCourses(filtered);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Gerenciar Bancada Express</h1>
      <p>
        Adicione novos cursos express para que os alunos possam testar e aprender
        rapidamente.
      </p>

      {/* Formulário para inserir um novo curso express */}
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
          Classificação (Estrelas, de 1 a 5):
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
        <p>Nenhum curso adicionado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "1rem" }}>
              {course.fotoCapa && (
                <img
                  src={course.fotoCapa}
                  alt={`Capa do curso ${course.titulo}`}
                  style={{ width: "200px", display: "block", marginBottom: "0.5rem" }}
                />
              )}
              <strong>{course.titulo}</strong> - R$ {course.preco.toFixed(2)} - Classificação: {course.rating} ⭐
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
