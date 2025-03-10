import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient"; // Certifique-se que o caminho é correto

// 🔹 Função para listar os cursos no Supabase
export async function GET() {
  try {
    const { data, error } = await supabase.from("courses_express").select("*");

    if (error) {
      console.error("Erro ao buscar cursos:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Verifica se a tabela está vazia
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "Nenhum curso encontrado." }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro inesperado ao buscar cursos:", error);
    return NextResponse.json({ error: "Erro inesperado ao buscar cursos." }, { status: 500 });
  }
}

// 🔹 Adiciona um método DELETE para excluir todos os cursos
export async function DELETE() {
  const { error } = await supabase.from("courses_express").delete().neq("id", 0); // Apaga todos

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Todos os cursos foram apagados!" });
}

// 🔹 Função para inserir um novo curso no Supabase
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Verifica se os dados estão completos
    if (!body.titulo || !body.descricao || !body.preco || !body.foto_capa || !body.rating) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Insere o curso no Supabase e retorna os dados inseridos
    const { data, error } = await supabase
      .from("courses_express")
      .insert([
        {
          titulo: body.titulo,
          descricao: body.descricao,
          preco: body.preco,
          foto_capa: body.foto_capa,
          rating: body.rating,
        },
      ])
      .select();

    if (error) {
      console.error("Erro ao inserir curso:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Curso criado com sucesso!", data }, { status: 201 });
  } catch (error) {
    console.error("Erro inesperado ao criar curso:", error);
    return NextResponse.json({ error: "Erro inesperado ao criar curso." }, { status: 500 });
  }
}
