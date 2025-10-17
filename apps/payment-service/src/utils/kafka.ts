import { createConsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("payments-service")
export const producer = createProducer(kafkaClient)
export const consumer = createConsumer(kafkaClient, "payments-group")