"use client";
import { useState, useEffect } from "react";

// 🛠️ Definição do tipo do curso para evitar erro de tipagem
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
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Estado para loading
  const [error, setError] = useState<string | null>(null); // ✅ Estado para erros

  // ✅ Buscar cursos do Supabase
  useEffect(() => {
    async function fetchCursos() {
      try {
        setLoading(true);
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Erro ao buscar cursos");
        const data: Curso[] = await res.json();
        setCursos(data);
      } catch (error) {
        setError("Erro ao carregar cursos. Tente novamente.");
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCursos();
  }, []);

  // ✅ Adicionar novo curso
  async function handleAdicionarCurso(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo || !descricao || !preco || !fotoCapa) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

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

      alert("Curso adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPreco("");
      setFotoCapa("");
      setError(null);
      
      // ✅ Atualizar a lista de cursos
      const updatedCursos = await fetch("/api/courses");
      const data: Curso[] = await updatedCursos.json();
      setCursos(data);
    } catch (error) {
      alert("Erro ao adicionar curso.");
      setError("Erro ao cadastrar curso. Tente novamente.");
      console.error(error);
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

      {/* ✅ Se estiver carregando, exibir mensagem */}
      {loading && <p>Carregando cursos...</p>}
      
      {/* ✅ Se houver erro, exibir mensagem */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Se a lista estiver vazia, exibir mensagem */}
      {cursos.length === 0 && !loading && !error ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>
              <strong>{curso.titulo}</strong> - R$ {curso.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
