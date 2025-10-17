import type { Product, Category } from "@repo/products-db"


export type ProductType = Product

export type ProductsType = Product[]

export type StripeProductType = {
  id: string
  name: string
  price: number
}

export type CategoryType = Category & {
}
