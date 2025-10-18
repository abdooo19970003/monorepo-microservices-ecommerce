import { Request, Response } from "express";
import { Prisma, prisma } from "@repo/products-db";
import { producer } from "../utils/kafka";
import { StripeProductType } from "@repo/types";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const product = await prisma.product.create({ data });
  producer.send(
    "product-created",
    {
      value: {
        id: product.id,
        name: product.name,
        price: product.price,
      } as StripeProductType
    },
  )
  res.status(201).json(product);
}
export const updateProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductUpdateInput = req.body;
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Id is required" });
  const product = await prisma.product.update({ where: { id: id }, data });
  res.status(200).json(product);
}
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.product.delete({ where: { id: id } });
  producer.send("product-deleted", { value: { id } })
  res.status(200).json({ message: "Product deleted" });
}


export const getAllProducts = async (req: Request, res: Response) => {

  // filters 
  const { sort, category, search, limit, page } = req.query;
  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
      case "desc":
        return { price: Prisma.SortOrder.desc };
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
      case "newest":
        return { createdAt: Prisma.SortOrder.desc };

      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  })

  const products = await prisma.product.findMany({
    where: {
      Category: { slug: category as string },
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: orderBy(),
    take: Number(limit) || undefined,
    skip: (Number(page) - 1) * Number(limit) || undefined,
    include: {
      Category: true,
    },
  });
  res.status(200).json(products);

}
export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await prisma.product.findUnique({ where: { id: id } });
  res.status(200).json(product);
}