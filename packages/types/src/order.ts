import { type OrderSchemaType } from "@repo/orders-db"

export type OrderType = OrderSchemaType & {
  _id: string
}

export type OrderChartType = {
  month: string // 2025 April
  total: number
  successful: number
}