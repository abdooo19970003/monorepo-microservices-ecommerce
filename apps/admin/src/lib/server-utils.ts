"use server"

import { auth } from "@clerk/nextjs/server"
import { toast } from "sonner"

export async function uploadProductImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  const { getToken } = await auth()
  const token = await getToken()
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/utils/upload-image`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error("Something went wrong", data.message)
    return data.url as string
  } catch (err) {
    console.log(err);
    throw err

  }
}