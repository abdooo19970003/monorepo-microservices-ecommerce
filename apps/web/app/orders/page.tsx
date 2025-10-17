'use server'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import StripePaymentForm from '../../components/StripePaymentForm'
import { type ShippingFormType } from '@repo/types'

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
  const shippingForm = {
    name: 'Abdullah Elkuse',
    address: 'Osmanlı Mah. Doğanca sk. 22/2',
    city: 'Kayseri',
    email: 'abdullah.elkuse@gmail.com',
    phone: '+90 552 314 97 38',
  } as ShippingFormType // TODO: GET / IMPLEMENT IT FROM UI

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
      <div className=''>
        <p className='text-2xl'>payment test</p>
        <StripePaymentForm shippingForm={shippingForm} />
      </div>
    </div>
  )
}

export default OrdersPage
