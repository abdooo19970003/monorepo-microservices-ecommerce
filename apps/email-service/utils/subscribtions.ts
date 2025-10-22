import { consumer } from "./kafka"
import { sendEmail } from "./mailer"


const userCreatedHandler = async (message: any) => {
  const user = message.value
  if (!user) console.log("No user found", user)
  const mailContent = `
      <h1>Welcome to our platform</h1>
      Hello ${user.firsName} ${user.lastName}<br/>
      Welcome to our platform<br/>
      Your email is: ${user.email}<br/>
      Your id is: ${user.id}<br/>
      Thank you for joining us<br/>
      `
  const emailAddress = user["email"];
  console.log(emailAddress);

  if (!emailAddress) console.log("No email found", emailAddress)
  console.log("Recived message : user-created ", user);
  await sendEmail(emailAddress, "Welcome to our platform", mailContent)
}

const orderCreatedHandler = async (message: any) => {
  const order = message.value
  console.log("Recived message : order-created ", order);
  const mailContent = `
      <h1>You Order Has been placed</h1>
      <p>order ID: ${order._id}</p>
      <p>order Status: ${order.status}</p>
      <p>order Total: ${(order.amount / 100).toFixed(2) + "  " + order.currency.toUpperCase()} </p>
      <p>order Date: ${order.createdAt.toLocaleString("tr")}</p>
      )`
  const reciverEmail = order.email;
  console.log(reciverEmail);
  if (!reciverEmail) console.log("No email found", reciverEmail)
  await sendEmail(reciverEmail, "You Order Has been placed", mailContent)
}


export const runKafkaSubscribtion = async () => {
  consumer.subscribe([{
    topicName: "user-created",
    topicHandler: userCreatedHandler
  },
  {
    topicName: "order-created",
    topicHandler: orderCreatedHandler
  }]

  )
}

