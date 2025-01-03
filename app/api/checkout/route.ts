import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export const POST = async (request: Request) => {
  try {
    // Parse request body
    const { products }: { products: Product[] } = await request.json();

    // Fetch active products from Stripe
    let activeProducts = await stripe.products.list({ active: true });

    // Match or create products in Stripe
    for (const product of products) {
      const matchedProduct = activeProducts.data.find(
        (stripeProduct) => stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      // If product doesn't exist in Stripe, create it
      if (!matchedProduct) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: "usd",
            unit_amount: product.price * 100, // Stripe expects price in cents
          },
        });
      }
    }

    // Refresh active products after creating new ones
    activeProducts = await stripe.products.list({ active: true });

    // Prepare Stripe line items
    const stripeProducts = products.map((product) => {
      const stripeProduct = activeProducts.data.find(
        (sp) => sp.name.toLowerCase() === product.name.toLowerCase()
      );

      if (stripeProduct) {
        return {
          price: stripeProduct.default_price as string,
          quantity: product.quantity,
        };
      }
      throw new Error(`Stripe product not found for: ${product.name}`);
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: stripeProducts,
      mode: "payment",
      success_url: `https://parakh-jewellars.vercel.app/success`,
      cancel_url: `https://parakh-jewellars.vercel.app/`,
    });

    // Return session URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in checkout route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
