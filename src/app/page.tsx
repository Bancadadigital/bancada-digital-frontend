"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("Carregando...");

  useEffect(() => {
    // Utiliza a variável de ambiente para obter a URL do backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    fetch(`${backendUrl}/status`)
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((err) => {
        console.error(err);
        setStatus("Erro ao conectar com o backend");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Bancada Digital</h1>
      <p>
        Status do backend: <strong>{status}</strong>
      </p>
    </div>
  );
}
