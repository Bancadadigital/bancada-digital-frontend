"use client";
import { useState, useEffect } from "react";

// 🔹 Definição do tipo Curso
type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  foto_capa: string;
};

export default function AdminDashboard() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [fotoCapa, setFotoCapa] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]); // ✅ Tipagem corrigida

  // ✅ Função para buscar cursos do Supabase
  useEffect(() => {
    async function fetchCursos() {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Erro ao buscar cursos.");
        const data: Curso[] = await res.json();
        setCursos(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCursos();
  }, []);

  // ✅ Função para adicionar curso ao Supabase
  async function handleAdicionarCurso(e: React.FormEvent) {
    e.preventDefault();
    const curso = {
      titulo,
      descricao,
      preco: parseFloat(preco),
      foto_capa: fotoCapa,
    };

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(curso),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Erro ao adicionar curso.");
      const novoCurso = await res.json();

      // ✅ Atualiza a lista de cursos após a inserção
      setCursos((prevCursos) => [...prevCursos, novoCurso.data[0]]);

      alert("Curso adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPreco("");
      setFotoCapa("");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Painel Admin - Adicionar Curso Express</h1>

      <form onSubmit={handleAdicionarCurso} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <input type="text" placeholder="URL da Foto Capa" value={fotoCapa} onChange={(e) => setFotoCapa(e.target.value)} required />
        <button type="submit">Adicionar Curso Express</button>
      </form>

      <h2>Cursos Existentes</h2>
      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado ainda.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cursos.map((curso: Curso) => (
            <li key={curso.id} style={{ marginBottom: "10px" }}>
              {curso.foto_capa && (
                <img src={curso.foto_capa} alt={`Capa do curso ${curso.titulo}`} style={{ width: "150px", display: "block" }} />
              )}
              <strong>{curso.titulo}</strong> - R$ {curso.preco.toFixed(2)}
              <p>{curso.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
