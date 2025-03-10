import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

/**
 * Endpoint GET: Retorna todos os cursos da tabela courses_express.
 */
export async function GET() {
  const { data, error } = await supabase.from("courses_express").select("*");

  if (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

/**
 * Endpoint POST: Insere um novo curso na tabela courses_express.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await supabase.from("courses_express").insert([body]).select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Curso criado!", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar curso." }, { status: 500 });
  }
}
