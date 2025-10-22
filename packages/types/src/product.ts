import type { Product, Category } from "@repo/products-db"
import z from "zod"


export type ProductType = Product

export type ProductsType = Product[]

export type StripeProductType = {
  id: string
  name: string
  price: number
}

export type CategoryType = Category & {
}

export const sizes = [
  'NoSize',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
]

export const colors = [
  'NoColor',
  'White',
  'Black',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Brown',
  'Gray',
  'Silver',
  'Gold',
]

export const newCategorySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
})
export type NewCategoryFormType = z.infer<typeof newCategorySchema>



export const newProductSchema = z
  .object({
    name: z.string().min(3).max(50),
    price: z.coerce.number().min(0, "Price must be a positive number").optional(),
    shortDescription: z.string().min(3).max(100),
    description: z.string().min(3).max(1000),
    categorySlug: z.string().min(1, "Category is required"),
    sizes: z.array(z.enum(sizes)).min(1, 'At least one size is required'),
    colors: z.array(z.enum(colors)).min(1, 'At least one color is required'),
    images: z.record(z.string(), z.string().min(1, 'Image for each color is required')),
  })
  .superRefine((data, ctx) => {
    for (const color of data.colors) {
      if (!data.images[color]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['images', color],
          message: `image is required for ${color} color`,
        })
      }
    }
  })
export type NewProductFormType = z.infer<typeof newProductSchema>