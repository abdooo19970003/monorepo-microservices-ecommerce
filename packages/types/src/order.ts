import { type OrderSchemaType } from "@repo/orders-db"

export type OrderType = OrderSchemaType & {
  _id: string
}