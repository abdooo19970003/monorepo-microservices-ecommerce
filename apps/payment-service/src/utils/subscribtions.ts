import { consumer } from "./kafka"
import { createStripProduct, deleteStripProduct } from "./stripe-product";


const productCreatedHandler = async (message: any) => {
  const product = message.value
  console.log("Recived message : product-created ", product);
  await createStripProduct(product)
}
const productDeletedHandler = async (message: any) => {
  const productId = message.value
  console.log("Recived message : product-deleted ", productId);
  await deleteStripProduct(productId)
}


export const runKafkaSubscribtion = async () => {
  consumer.subscribe([
    {
      topicName: "product-created",
      topicHandler: productCreatedHandler
    },
    {
      topicName: "product-deleted",
      topicHandler: productDeletedHandler
    }
  ])
}

