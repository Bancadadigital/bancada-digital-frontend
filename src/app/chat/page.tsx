"use client";
import { useState } from "react";
import Link from "next/link";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Função para enviar a mensagem e receber a resposta da IA via API
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Chama o endpoint da API do chat
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      // Processa a resposta da OpenAI. O formato pode variar; ajuste conforme necessário.
      const aiText = data.choices && data.choices[0]?.message?.content
        ? data.choices[0].message.content
        : "Desculpe, não consegui obter uma resposta.";

      const aiMessage: Message = { sender: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const aiMessage: Message = { sender: "ai", text: "Erro ao processar sua mensagem." };
      setMessages((prev) => [...prev, aiMessage]);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat de Inteligência Artificial</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 ? (
          <p>Comece a conversar!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "0.5rem" }}>
              <strong>{msg.sender === "user" ? "Você:" : "IA:"}</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Enviar
        </button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <Link href="/">Voltar para a Home</Link>
      </div>
    </div>
  );
}
