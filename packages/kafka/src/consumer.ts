import type { Consumer, Kafka } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {

  const consumer: Consumer = kafka.consumer({ groupId })

  const connect = async () => {
    await consumer.connect()
    console.log(groupId + " Consumer connected");
  }

  const subscribe = async (
    topics: { topicName: string, topicHandler: (message: any) => Promise<void> }[]
  ) => {
    await consumer.subscribe({ topics: topics.map(topic => topic.topicName), fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const topicConfig = topics.find((t) => t.topicName === topic)
          if (!topicConfig) return
          const handler = topicConfig.topicHandler
          const value = message.value?.toString()
          if (value)
            await handler(JSON.parse(value))
        } catch (error) {
          console.log("Error Proccessin Message", error);

        }
      }
    })
  }
  const desconnect = async () => await consumer.disconnect()



  return {
    connect,
    subscribe,
    desconnect
  }
}