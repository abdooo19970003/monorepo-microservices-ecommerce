import { Hono } from "hono";
import { stripe } from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";
import type { CartItemsType } from "@repo/types";
import { getStripProductPrice } from "../utils/stripe-product";

export const sessionRoute = new Hono();



sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {
  try {
    const { cart }: { cart: CartItemsType } = await c.req.json()
    const userId = c.get('userId')


    // Here, you would typically calculate the total amount based on the cart items
    // const line_items = cart.map(item => ({
    //   price_data: {
    //     currency: 'usd',
    //     product_data: {
    //       name: item.name,
    //     },
    //     unit_amount: item.price * 100, // price in cents
    //   },
    //   quantity: item.quantity,
    // }));

    const line_items = await Promise.all(cart.map(async (item) => {
      const unit_amount = await getStripProductPrice(String(item.id))
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: unit_amount as number, // price in cents
        },
        quantity: item.quantity,
      }
    }))

    const session = await stripe.checkout.sessions.create({
      line_items,
      client_reference_id: userId,
      mode: 'payment',
      ui_mode: 'custom',
      return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`
    });
    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return c.json({ error })

  }

});


sessionRoute.get("/:session_id", async (c) => {
  const sessionId = c.req.param("session_id");
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  });
  return c.json({
    status: session.status,
    payment_status: session.payment_status,
    amount_total: session.amount_total,
    currency: session.currency,
    line_items: session.line_items?.data,
    customer_details: session.customer_details,
    brand: session.branding_settings,
  })
});
