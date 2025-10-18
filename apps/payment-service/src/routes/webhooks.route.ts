import { Hono } from "hono";
import type Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { producer } from "../utils/kafka";

export const webhookRoute = new Hono();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

webhookRoute.post('/stripe', async (c) => {
  const body = await c.req.text();
  const sig = c.req.header('stripe-signature');
  if (!sig) {
    return c.json({ error: 'Missing stripe-signature header' }, 400);
  }
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, webhookSecret!);
  } catch (error) {
    console.log('Error verifying webhook signature:', error);
    return c.json({ error: 'Webhook signature verification failed' }, 400);
  }

  // Handle the event

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const line_items = await stripe.checkout.sessions.listLineItems(session.id)

      // TODO : Create order in DB
      producer.send("payment-successful", {
        value: {
          userId: session.client_reference_id,
          email: session.customer_details?.email,
          amount: session.amount_total,
          currency: session.currency,
          status: session.payment_status === "paid" ? "success" : "failed",
          shippingAddress: session.customer_details?.address,
          products: line_items.data.map((item) => ({
            name: item.description,
            quantity: item.quantity,
            price: item.price?.unit_amount,
          }))
        }
      })
      console.log("Checkout Session Completed:", session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return c.json({ received: true });

}) 