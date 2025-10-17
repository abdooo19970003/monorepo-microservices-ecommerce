'use client'

import { loadStripe } from '@stripe/stripe-js'
import { CartItemsType, ShippingFormType } from '@repo/types'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import CheckoutForm from './CheckoutForm'
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout'
import useCartStore from '../store/cart-store'

const strip = loadStripe(
  'pk_test_51SEdSnE3MpPNtHijuaM6d3qiD5p8RxiFNn3Rhzk6v06wKJbXYD0cDg4lWooQHFkx44w9v8QuD5YBYoLR3uobRTun00hy2JcXkx'
)

const createClientSecret = async (token: string, cart: CartItemsType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/create-checkout-session`,
    {
      method: 'POST',
      body: JSON.stringify({ cart }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const data = await res.json()
  return (data.checkoutSessionClientSecret as string) || null
}

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormType
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { getToken } = useAuth()
  const { cart } = useCartStore()

  useEffect(() => {
    let mounted = true
    getToken().then((t) => {
      if (mounted) setToken(t)
      else return
    })
    return () => {
      mounted = false
    }
  }, [getToken])

  useEffect(() => {
    if (!token) return
    // const cart = [
    //   {
    //     id: 'prod_TBB08xVOEglnuP',
    //     name: 'Test Product',
    //     price: 4.99,
    //     quantity: 5,
    //     selectedColor: 'red',
    //     selectedSize: 'M',
    //   },
    // ] as CartItemsType //TODO: GET / IMPLEMENT IT FROM UI STATE MANAGEMENT LIBRARY (zustand)
    let cancelled = false
    createClientSecret(token, cart).then((secret) => {
      if (!cancelled) setClientSecret(secret)
    })

    return () => {
      cancelled = true
    }
  }, [token])
  if (!token || !clientSecret) return <div>Loadiiiing...</div>
  return (
    <CheckoutProvider
      stripe={strip}
      options={{ clientSecret }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  )
}

export default StripePaymentForm
