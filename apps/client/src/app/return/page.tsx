import { StripeCheckoutSession } from '@stripe/stripe-js'
import React from 'react'

const PaymentRecived = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string } | undefined>
}) => {
  const session_id = (await searchParams)?.session_id

  if (!session_id) return <div>No session id provided</div>
  // Here you can fetch the session details from your backend or directly from Stripe
  // using the session_id to confirm the payment status and display relevant information.

  const res = await fetch(
    process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL + `/session/${session_id}`,
    {
      method: 'GET',
    }
  )
  const data = await res.json()
  console.log(data)
  return (
    <div className=''>
      <p>ID:{session_id}</p>
      <p>Status: {data.status}</p>
      <p>Payment Status: {data.payment_status}</p>
      <p>
        Amount: {Number(data.amount_total / 100).toLocaleString('tr-TR')}{' '}
        {data.currency}
      </p>
      <p>Email: {data.customer_details?.email}</p>
      {data.line_items.map((item: any) => (
        <p key={item.id}>{item.description}</p>
      ))}
    </div>
  )
}

export default PaymentRecived
