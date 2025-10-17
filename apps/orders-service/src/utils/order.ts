import { Order } from "@repo/orders-db";
import { OrderType } from "@repo/types";


export const createOrder = async (order: OrderType) => {
  console.log("createOrder");
  const newOrder = new Order(order)
  try {
    await newOrder.save()
    console.info("Order created"
      , newOrder._id
    );
    return true
  } catch (error) {
    console.log("Error creating order", error);
    throw error
  }
} 