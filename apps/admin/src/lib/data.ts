import { auth, getAuth } from '@clerk/nextjs/server'
import { cardItemType } from '@repo/types';
export const getOrderChartData = async (token: string) => {
  const url = `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return data
}

export const getLatestOrders = async (token: string): Promise<cardItemType[]> => {
  const url = `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders/latest`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return data
}
export const getLatestProducts = async (token: string): Promise<cardItemType[]> => {
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/latest`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return data
}