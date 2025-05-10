import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pounds",
      automatic_payment_methods: { enable: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.clientSecret });
  } catch (error) {
    console.error("Internal Error", error);
    // Handle other errors eg Network

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
