"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [fotoCapa, setFotoCapa] = useState("");
  const [cursos, setCursos] = useState([]);

  // ✅ Função para buscar cursos do Supabase
  useEffect(() => {
    async function fetchCursos() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCursos(data);
    }
    fetchCursos();
  }, []);

  // ✅ Função para adicionar curso ao Supabase
  async function handleAdicionarCurso(e: React.FormEvent) {
    e.preventDefault();
    const curso = { titulo, descricao, preco: parseFloat(preco), foto_capa: fotoCapa };

    const res = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(curso),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Curso adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPreco("");
      setFotoCapa("");
    } else {
      alert("Erro ao adicionar curso.");
    }
  }

  return (
    <div>
      <h1>Painel Admin - Adicionar Curso Express</h1>
      <form onSubmit={handleAdicionarCurso}>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <input type="text" placeholder="URL da Foto Capa" value={fotoCapa} onChange={(e) => setFotoCapa(e.target.value)} required />
        <button type="submit">Adicionar Curso Express</button>
      </form>

      <h2>Cursos Existentes</h2>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.titulo}</strong> - R$ {curso.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
