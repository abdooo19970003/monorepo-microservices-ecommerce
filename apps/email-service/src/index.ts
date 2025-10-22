import { consumer, producer } from "../utils/kafka";
import { runKafkaSubscribtion } from "../utils/subscribtions";


const start = async () => {
  try {
    await consumer.connect()
    await producer.connect()
    await runKafkaSubscribtion()
  } catch (error) {
    console.log(error);

  }
}

start()