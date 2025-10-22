import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware.js";
import { Order } from "@repo/orders-db";
import { startOfMonth, subMonths } from "date-fns";
import { cardItemType, OrderChartType } from "@repo/types";

export const orderRoute = async (fastify: FastifyInstance) => {

  fastify.get("/user-orders", { preHandler: shouldBeUser }, async (request, reply) => {
    const orders = await Order.find({ userId: request.userId })
    return reply.send(orders)
  })
  fastify.get("/orders", { preHandler: shouldBeAdmin }, async (request, reply) => {
    const orders = await Order.find()
    return reply.send(orders)
  })
  fastify.get("/order-chart", { preHandler: shouldBeAdmin }, async (request, reply) => {
    const result: OrderChartType[] = []
    // expected format : [] of {month: "April" , total: 20 , successful: 15}*6
    const now = new Date()
    const sixMonthsAgo = startOfMonth(subMonths(now, 5))
    const raw = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthsAgo,
            $lte: now
          }
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          total: { $sum: 1 },
          successful: { $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] } }
        }
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          total: 1,
          successful: 1
        }
      },
      {
        $sort: {
          year: 1,
          month: 1
        }
      },
    ])

    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(now, i)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const match = raw.find(
        item => item.year === year && item.month === month
      )
      result.push(
        {
          month: `${Months[month - 1]} ${year}`,
          total: match?.total || 0,
          successful: match?.successful || 0
        }
      )
    }
    return reply.send(result)
  })

  fastify.get("/orders/latest", { preHandler: shouldBeAdmin }, async (request, reply) => {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5)
    const cardsData: cardItemType[] = []
    if (orders.length === 0) return reply.send([])
    for (const order of orders) {
      let cardItem: cardItemType = {
        id: order._id._id.toString(),
        title: new Date(order.createdAt).toLocaleDateString("tr") + "-" + order._id._id.toString().substring(0, 10),
        badge: order.status,
        count: order.amount / 100,
        image: "/order-placeholder.jpeg"
      }
      cardsData.push(cardItem)
    }
    return reply.send(cardsData)
  })

}