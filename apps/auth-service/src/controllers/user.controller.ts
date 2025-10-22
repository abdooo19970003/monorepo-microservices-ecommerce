import { clerkClient } from "@clerk/express";
import { json, Request, Response } from "express";
import { producer } from "../utils/kafka";


export const getAllUsers = async (req: Request, res: Response) => {
  const users = await clerkClient.users.getUserList();
  console.log(users)
  res.json(users as object)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "id is required" })
  const user = await clerkClient.users.getUser(id);
  res.status(200).json(user)
}

export const updateUser = async (req: Request, res: Response) => {
  throw new Error("Function not implemented.");

}
export const createUser = async (req: Request, res: Response) => {
  type CreateUserParams = Parameters<typeof clerkClient.users.createUser>[0];
  const newUser: CreateUserParams = req.body;
  const user = await clerkClient.users.createUser(newUser);
  producer.send("user-created", {
    value: {
      firsName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      id: user.id,
    }
  })
  res.status(200).json(user)
}
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "id is required" })
  console.log(req.userId);
  try {

    const user = await clerkClient.users.deleteUser(id);
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
    throw error;

  }
}