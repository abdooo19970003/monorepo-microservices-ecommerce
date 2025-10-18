import { Schema, model, type InferSchemaType } from "mongoose";

export const OrderStatus = [
  'pending',
  'success',
  'failed'
]

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: "usd" },
  status: { type: String, required: true, enum: OrderStatus, default: 'pending' },
  products: {
    type: [{
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true }
    }],
    required: true
  }

}, { timestamps: true });

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;
export const Order = model<OrderSchemaType>('Order', OrderSchema);