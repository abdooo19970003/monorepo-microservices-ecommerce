import { Prisma, prisma } from "@repo/products-db";
import { Request, Response } from "express";

const slugify = (str: string) => {
  return str
    .toString()
    .trim()
    // Convert to lowercase (only affects Latin letters, Arabic stays as-is)
    .toLowerCase()
    // Replace spaces and underscores with a dash
    .replace(/[\s_]+/g, "-")
    // Remove all characters except letters (Arabic + Latin), numbers, and dashes
    .replace(/[^a-z0-9\u0600-\u06FF-]+/g, "")
    // Remove multiple dashes
    .replace(/-+/g, "-")
    // Remove leading/trailing dashes
    .replace(/^-+|-+$/g, "");
}
export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;
  if (!data.name) return res.status(400).json({ message: "Name is required" });
  data.slug = slugify(data.name);
  const category = await prisma.category.create({ data });
  res.status(201).json(category);
}

export const updateCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryUpdateInput = req.body;
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Id is required" });
  const category = await prisma.category.update({ where: { id: id }, data });
  res.status(200).json(category);
}
export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.category.delete({ where: { id: id } });
  res.status(200).json({ message: "Category deleted" });
}
export const getCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await prisma.category.findUnique({ where: { id: id } });
  res.status(200).json(category);
}
export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);

}