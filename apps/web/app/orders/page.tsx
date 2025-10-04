import { auth } from '@clerk/nextjs/server'
import React from 'react'

const OrdersPage = async () => {
  const { userId, getToken } = await auth()
  const token = await getToken()
  console.log(token)
  const res1 = await fetch('http://localhost:8000/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data1 = await res1.json()
  const res2 = await fetch('http://localhost:8001/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data2 = await res2.json()
  const res3 = await fetch('http://localhost:8002/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data3 = await res3.json()
  console.log(data3)
  return (
    <div className='text-3xl'>
      Orders Page
      <hr />
      <code className='text-base '>
        Products-service: {JSON.stringify(data1, null, 2)}
      </code>
      <br />{' '}
      <code className='text-base '>
        Orders-service:{JSON.stringify(data2, null, 2)}
      </code>
      <br />{' '}
      <code className='text-base '>
        Payment-service:{JSON.stringify(data3, null, 2)}
      </code>
    </div>
  )
}

export default OrdersPage
