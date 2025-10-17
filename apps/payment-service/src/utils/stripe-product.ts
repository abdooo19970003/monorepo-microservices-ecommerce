import type { StripeProductType } from "@repo/types";
import { stripe } from "./stripe";


export const createStripProduct = async (item: StripeProductType) => {
  try {
    const res = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
      },
    })
    return res
  } catch (err) {
    console.log(err);
    return err
  }
}

export const getStripProductPrice = async (productId: string) => {
  try {
    const res = await stripe.prices.list({
      product: productId
    })
    return res.data[0]?.unit_amount
  } catch (err) {
    console.log(err);
    return err
  }
}

export const deleteStripProduct = async (productId: string) => {
  try {
    await stripe.products.del(productId)
    return true
  } catch (error) {
    console.log(`Error Deletiting Product with Id: ${productId}`, error);
    return false
  }
}