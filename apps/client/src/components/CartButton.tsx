'use client'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import useCartStore from '../store/cart-store'
import { CartItemType } from '@repo/types'

const CartButton = () => {
  const { cart, isHydrated } = useCartStore()
  return (
    <Link
      href={'/cart'}
      className='relative'
    >
      <ShoppingCart className='w-4 h-4 text-gray-600' />
      {isHydrated && cart.length > 0 && (
        <Badge className='bg-amber-400  text-gray-600 absolute -top-3 -right-3 rounded-full p-0 w-4 h-4'>
          {cart.reduce(
            (acc: number, item: CartItemType) => item.quantity + acc,
            0
          )}
        </Badge>
      )}
    </Link>
  )
}

export default CartButton
