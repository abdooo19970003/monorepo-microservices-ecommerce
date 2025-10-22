import { consumer } from "./kafka"
import { createOrder } from "./order";

export const runKafkaSubscribtion = async () => {

  consumer.subscribe([{
    topicName: "payment-successful",
    topicHandler:
      async (message) => {
        const order = message.value
        console.log("Recived message : payment-successful ", order);
        await createOrder(order)
      }
  }]
  )
}