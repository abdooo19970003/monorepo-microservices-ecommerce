'use client'
import { useCheckout, PaymentElement } from '@stripe/react-stripe-js/checkout'
import React, { useState } from 'react'
import { ShippingFormType } from '@repo/types'
import { ConfirmError } from '@stripe/stripe-js'
import { Loader } from 'lucide-react'

const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormType }) => {
  const checkout = useCheckout()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ConfirmError | null>(null)
  const handleClick = async () => {
    setLoading(true)
    setError(null)
    if (checkout.type == 'error') setError(checkout.error as ConfirmError)
    else if (checkout.type == 'loading') {
      setLoading(true)
      console.log(checkout)
    }
    if (checkout.type == 'success') {
      console.log(checkout)
      await checkout.checkout.updateEmail(shippingForm.email)
      await checkout.checkout.updateShippingAddress({
        name: shippingForm.name,
        address: {
          line1: shippingForm.address,
          city: shippingForm.city,
          country: 'TR',
        },
      })
      const res = await checkout.checkout.confirm()
      console.log(res)
      if (res.type === 'error') setError(res.error as ConfirmError)
      setLoading(false)
    }
  }

  return (
    <>
      <form>
        <div className='text-red-400 text-base text-end'>{error?.message}</div>
        <PaymentElement
          options={{
            layout: 'auto',
          }}
        />

        <button
          disabled={loading}
          onClick={handleClick}
          className='!px-5  !mt-5 bg-blue-500 rounded-xl hover:bg-blue-600 text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
        >
          {loading ? <Loader className='h-4 w-4 animate-spin' /> : 'Pay'}
        </button>
      </form>
    </>
  )
}

export default CheckoutForm
