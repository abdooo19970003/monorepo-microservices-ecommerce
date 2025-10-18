import * as z from "zod";
import { type Product } from "@repo/products-db";


export type CartItemType = Product & {
  quantity: number
  size: string,
  color: string,
}

export type CartItemsType = CartItemType[]

export const shippingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(7, { message: "Phone number must be between 7-15 characters" }).max(15, { message: "Phone number must be between 7-15 characters" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, { message: "Invalid email" }),
  city: z.string().min(1, { message: "City is required" }),
})

export type ShippingFormType = z.infer<typeof shippingFormSchema>

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(1, { message: "Card number is required" }),
  cardHolder: z.string().min(1, { message: "Card holder is required" }),
  expirationDate: z.string().min(1, { message: "Expiration date is required" }).regex(/^(0[1-9]|1[0-2])\/?[0-9]{2}$/, { message: "Invalid expiration date" }),
  cvv: z.string().min(1, { message: "CVV is required" }),
})

export type PaymentFormType = z.infer<typeof paymentFormSchema>

