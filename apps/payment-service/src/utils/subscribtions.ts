import { consumer } from "./kafka"
import { createStripProduct, deleteStripProduct } from "./stripe-product";

export const runKafkaSubscribtion = async () => {
  consumer.subscribe(["product-created"],
    async (message) => {
      const product = message.value
      console.log("Recived message : product-created ", product);
      await createStripProduct(product)
    }
  )
  consumer.subscribe(["product-deleted"],
    async (message) => {
      const productId = message.value
      console.log("Recived message : product-deleted ", productId);
      await deleteStripProduct(productId)
    }
  )

}