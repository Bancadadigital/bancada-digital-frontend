import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // verifique se este modelo está disponível para sua chave
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    console.log("Resposta da OpenAI:", data); // Log para debug

    // Se a resposta tiver um erro, você pode tratar ou lançar um erro
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("Resposta inesperada:", data);
      return NextResponse.json({ error: "Resposta inesperada da OpenAI" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API do chat:', error);
    return NextResponse.error();
  }
}

