import { Order } from "@repo/orders-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";


export const createOrder = async (order: OrderType) => {
  console.log("createOrder");
  const newOrder = new Order(order)
  try {
    await newOrder.save()
    console.info("Order created"
      , newOrder._id
    );
    producer.send("order-created", { value: newOrder })
    return true
  } catch (error) {
    console.log("Error creating order", error);
    throw error
  }
} 