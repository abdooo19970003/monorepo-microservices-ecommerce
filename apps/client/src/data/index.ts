import { CategoryType, OrderType, ProductsType } from "@repo/types";


export const getProductsData = async ({ category, search, params, sort = "newest" }: {
  category?: string,
  sort?: string,
  search?: string,
  params?: 'Home' | 'Products'
}) => {
  console.log({ category, search, params });

  const urlParams = new URLSearchParams()
  if (category) urlParams.append('category', category)
  if (sort) urlParams.append('sort', sort)
  if (search) urlParams.append('search', search)
  if (params && params === 'Home') urlParams.append('limit', "8")
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${urlParams.toString()}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const data = await res.json()
  return data as ProductsType
}

export const getCategoriesData = async () => {
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return data as CategoryType[]
}

export const getProductData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }

  })
  const data = await res.json()
  return data

}

export const getUserOrders = async (token: string): Promise<OrderType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await res.json()
  return data
}