'use client'
import React, { useState } from 'react'
import { CartItemType, ProductType } from '@repo/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import useCartStore from '../store/cart-store'
import { toast } from 'sonner'

const ProductInteraction = ({
  product,
  size,
  color,
}: {
  product: ProductType
  size: string
  color: string
}) => {
  const [variant, setVariant] = useState({
    size,
    color,
  })
  const [qty, setQty] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart } = useCartStore()
  const handleClick = (key: string, value: string) => {
    setVariant({ ...variant, [key]: value })
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    router.push(`/products/${product.id}?${params}`, { scroll: false })
  }

  const handleAddToCart = () => {
    if (!variant.size || String(variant.size).length === 0) {
      alert('Select Size first')
      return
    }

    const cartProduct: CartItemType = {
      ...product,
      color: variant.color,
      size: variant.size,
      quantity: qty,
    }
    addToCart(cartProduct)
    toast.success('Cart Updated', {
      action: {
        label: 'Go to cart',
        onClick: () => router.push('/cart'),
      },
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className=''>
        <h4 className='text-gray-500'>Size:</h4>
        <div className='flex gap-2 justify-start items-center'>
          {product.sizes.map((s) => (
            <Button
              variant={'outline'}
              key={s}
              disabled={variant.size === s}
              className='disabled:bg-black disabled:text-white'
              onClick={() => {
                handleClick('size', s)
              }}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>
      <div className=''>
        <h4 className='text-gray-500'>Color: </h4>
        <div className='flex gap-2 justify-start items-center'>
          {product.colors.map((c) => (
            <Button
              variant={'outline'}
              key={c}
              disabled={variant.color === c}
              onClick={() => {
                handleClick('color', c)
              }}
              className='capitalize disabled:shadow-2xl'
              style={{ background: c, color: 'white' }}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      <div className=''>
        <h4 className='text-gray-500'>Quantity: </h4>
        <div className='flex gap-2 justify-start items-center'>
          <Button
            variant={'outline'}
            onClick={() => setQty(qty - 1)}
            disabled={qty === 1}
          >
            <Minus />
          </Button>
          <span className='mx-3 font-medium'>{qty}</span>
          <Button
            variant={'outline'}
            onClick={() => setQty(qty + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <Button
        className='mt-9'
        size={'lg'}
        onClick={handleAddToCart}
      >
        {' '}
        <ShoppingCart /> Add To Cart
      </Button>
    </div>
  )
}

export default ProductInteraction
