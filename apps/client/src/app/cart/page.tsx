'use client'

import { CartItemType } from '../../../../../packages/types/src/cart'
import ShippingForm, { shippingFormInput } from '../../components/ShippingForm'
import StripePaymentForm from '../../components/StripePaymentForm'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'
import useCartStore from '../../store/cart-store'
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const steps = [
  {
    id: 1,
    title: 'Shopping Cart',
  },
  {
    id: 2,
    title: 'Shipping Address',
  },
  {
    id: 3,
    title: 'Payment',
  },
]

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeStep = parseInt(searchParams.get('step') || '1')
  const totalPrice = cart
    .reduce((acc: number, i: any) => acc + i.price * i.quantity, 0)
    .toFixed(2)
  const [shippingForm, setShippingForm] = useState<shippingFormInput>()
  console.log(cart)

  return (
    <div className='flex flex-col gap-8 items-center justify-center pt-8 '>
      <h1 className='text-2xl font-medium'>Your Shopping Cart</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 text-center gap-8 lg:gap-16'>
        {steps.map((s) => (
          <div
            key={s.id}
            className={cn(
              'flex justify-center items-center gap-3 border-b-2 font-medium p-2 text-sm',
              activeStep === s.id
                ? ' border-gray-800 text-gray-800'
                : ' border-gray-300 text-gray-300'
            )}
          >
            <Badge
              className={cn(
                'w-6 h-6 rounded-full p-1 text-xl',
                activeStep === s.id ? ' bg-gray-800' : ' bg-gray-300 '
              )}
            >
              {s.id}
            </Badge>
            <span>{s.title}</span>
          </div>
        ))}
      </div>

      {/* Steps & Details */}
      <div className=' w-full flex flex-col lg:flex-row gap-12 justify-center items-start'>
        {/* STEPS */}
        <div className='w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-6'>
          {activeStep === 1 ? (
            <div className='space-y-3'>
              <h2 className=' mb-8 font-medium text-base'>Cart Items</h2>
              {cart.length === 0 ? (
                <>
                  <p className='text-muted-foreground text-center my-3'>
                    Your Cart is Empty!
                  </p>
                  <Button
                    variant={'link'}
                    className={cn(' cursor-pointer')}
                    onClick={() => router.push('/', { scroll: false })}
                  >
                    <ArrowLeft /> Continue Shopping
                  </Button>
                </>
              ) : (
                cart.map((p: CartItemType) => (
                  <div
                    key={`${p.id}-${p.size}-${p.color}`}
                    className='flex gap-2 py-3 rounded-lg shadow-sm m-4 pe-3'
                  >
                    <div className='rounded-lg relative w-32 '>
                      <Image
                        alt={p.name}
                        src={(p.images as Record<string, string>)?.[p.color]!}
                        fill
                        className='object-contain '
                      />
                    </div>
                    <div className='flex-1 flex flex-col gap-4'>
                      <div className='text-sm text-gray-500 flex flex-col '>
                        <h3 className='text-base font-medium text-gray-800'>
                          {p.name}
                        </h3>
                        <p>Quantity: {p.quantity}</p>
                        <p>Size: {p.size}</p>
                        <p>Color: {p.color}</p>
                      </div>
                      <p className='text-base text-gray-800'>
                        {' '}
                        {p.price.toFixed(2)} $ x{' '}
                        <span className='text-amber-600 font-semibold'>
                          {p.quantity}
                        </span>{' '}
                        ={' '}
                        <span className='font-semibold'>
                          {(p.price * p.quantity).toFixed(2)} $
                        </span>
                      </p>
                    </div>
                    <Button
                      variant={'destructive'}
                      className='my-auto text-lg rounded-lg bg-red-700 cursor-pointer '
                      onClick={() => removeFromCart(p)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <Button
                  className='float-end'
                  variant={'outline'}
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              )}
            </div>
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 ? (
            <StripePaymentForm shippingForm={shippingForm!} />
          ) : (
            <p className='text-sm text-gray-500'>
              Please fill shipping form first
            </p>
          )}
        </div>
        {/* CART DETAILS  */}
        <div className='w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-6'>
          <h2 className='font-semibold'>Cart Details</h2>
          <div className='flex flex-col gap-4 text-muted-foreground text-sm'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span className='font-medium'>{totalPrice} $</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount(10%)</span>
              <span className='text-green-500 font-medium'>
                -{(Number(totalPrice) * 0.1).toFixed(2)} $
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping Fees </span>
              <span className='text-red-500 font-medium'>
                +{(Number(totalPrice) * 0.1).toFixed(2)} $
              </span>
            </div>
            <hr />
            <div className='flex justify-between text-accent-foreground font-medium text-base'>
              <span>Total</span>
              <span>{totalPrice} $</span>
            </div>
          </div>
          <Button
            variant={'default'}
            className={cn(
              'w-full cursor-pointer',
              activeStep !== 1 && 'hidden'
            )}
            onClick={() => router.push('/cart?step=2', { scroll: false })}
          >
            Continue <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
