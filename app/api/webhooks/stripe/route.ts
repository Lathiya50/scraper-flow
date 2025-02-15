import { HandleCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("@event...", event.type);

    switch (event?.type) {
      case "checkout.session.completed":
        // handle checkout session completed event
        HandleCheckoutSessionCompleted(event.data.object);
        break;
      // case "payment_intent.payment_failed ":

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("stripe webhook error", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
