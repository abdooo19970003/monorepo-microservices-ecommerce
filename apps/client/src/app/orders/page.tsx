import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { getUserOrders } from '../../data'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '../../components/ui/empty'
import { Button } from '../../components/ui/button'
import Link from 'next/link'

const OrderPage = async () => {
  const { getToken } = await auth()
  const token = await getToken()
  if (!token) {
    return <div className=''>Please login to see your orders.</div>
  }
  const orders = await getUserOrders(token)
  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No orders found</EmptyTitle>
        </EmptyHeader>
        <EmptyDescription>
          there is no records for any previous orders
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link href={'/'}>Back to Home and Make an Order</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }
  console.log(orders)
  return (
    <div>
      <h1 className='text-2xl mb-6'> Your Orders</h1>
      <ul className='space-y-4'>
        {orders.map((order) => (
          <li
            key={order._id}
            className='rounded outline  p-4'
          >
            <div className='flex items-center gap-3'>
              <span className='text-muted-foreground text-sm font-medium'>
                Order ID :
              </span>
              <span className='text-muted-foreground text-sm'>
                {' '}
                {order._id}
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <span className=' text-sm font-medium'>Amount :</span>
              <span className='text-sm'>
                {' '}
                {(order.amount / 100).toFixed(2)}{' '}
                <span className='uppercase'>{order.currency}</span>
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <span className=' text-sm font-medium'>Status :</span>
              <span className='text-sm'> {order.status}</span>
            </div>
            {order.createdAt && (
              <div className='flex items-center gap-3'>
                <span className=' text-sm font-medium'>Date :</span>
                <span className='text-sm'>
                  {' '}
                  {new Date(order.createdAt).toLocaleDateString('tr')}
                </span>
              </div>
            )}
            <div className='flex  gap-3'>
              <div className='flex-1 '>
                {order.products.map((product) => (
                  <table
                    key={product._id.toString()}
                    className='w-full text-center '
                  >
                    <tr>
                      <th colSpan={3}>product</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>total</th>
                    </tr>
                    <tr>
                      <td colSpan={3}>{product.name}</td>
                      <td>
                        {(product.price / 100).toFixed(2) +
                          ' ' +
                          order.currency}{' '}
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        {((product.price * product.quantity) / 100).toFixed(2)}{' '}
                        {order.currency}{' '}
                      </td>
                    </tr>
                  </table>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderPage
