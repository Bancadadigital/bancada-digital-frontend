import { NextResponse } from "next/server";
import Stripe from "stripe";

// Inicializa o Stripe com a chave secreta (definida no .env.local)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2025-02-24" });

export async function POST(req: Request) {
  try {
    // Recebe o priceId enviado pelo frontend
    const { priceId } = await req.json();

    // Define o modo de checkout:
    // Se o priceId for o da assinatura mensal, use "subscription",
    // caso contrário, use "payment" para compra única.
    const mode = (priceId === "price_1R0pVvJJV3Ij9mdU6bt9Qpr3") ? "subscription" : "payment";

    // Cria a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // ID do preço conforme configurado no Stripe
          quantity: 1,
        },
      ],
      mode, // 'subscription' para assinaturas ou 'payment' para compra única
      success_url: "http://192.168.1.220:3001/success", // URL de sucesso
      cancel_url: "http://192.168.1.220:3001/cancel",   // URL de cancelamento
    });

    // Retorna a URL da sessão para redirecionar o usuário
    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão de pagamento:", error);
    return NextResponse.json({ error: "Erro ao criar a sessão de pagamento." }, { status: 500 });
  }
}
