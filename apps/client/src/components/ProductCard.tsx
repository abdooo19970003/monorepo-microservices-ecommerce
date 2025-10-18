'use client'
import React, { useState } from 'react'
import { CartItemType, ProductType } from '@repo/types'
import Image from 'next/image'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { ShoppingCart, Tag } from 'lucide-react'
import useCartStore from '../store/cart-store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ProductCard = ({ p }: { p: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(p.colors[0]!)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  )
  const router = useRouter()
  const { addToCart, cart } = useCartStore()
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Select Size first')
      return
    }

    const cartProduct: CartItemType = {
      ...p,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    }

    addToCart(cartProduct)
    toast.success('Cart Updated', {
      action: {
        label: 'Go to cart',
        onClick: () => router.push('/cart'),
      },
      classNames: { success: 'bg-red-500' },
    })
  }
  return (
    <div className='shadow-lg rounded-lg overflow-hidden'>
      <Link
        href={`/products/${p.id}?color=${selectedColor}&size=${selectedSize}`}
      >
        <div className='w-full aspect-[2/3] relative hover:scale-105 transition-all duration-200'>
          <Image
            src={
              (p.images as Record<string, string>)?.[selectedColor] ||
              '/placeholder.jpg'
            }
            fill
            alt={`${p.name}-${selectedColor}`}
            className='object-cover'
          />
        </div>
      </Link>
      <div className='flex flex-col gap-4 p-4 '>
        <h3 className='font-medium'>{p.name}</h3>
        <p className='text-sm text-gray-600'>{p.shortDescription}</p>
        <div className='flex justify-between items-start'>
          <div className=' grid grid-cols-1 gap-2'>
            <p className='text-sm text-muted-foreground'>Size</p>
            <Select
              defaultValue={selectedSize || undefined}
              onValueChange={setSelectedSize}
            >
              <SelectTrigger className=''>
                <SelectValue placeholder='Size' />
              </SelectTrigger>
              <SelectContent>
                {p.sizes.map((s) => (
                  <SelectItem
                    value={s}
                    key={s}
                  >
                    {s.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='  grid grid-cols-1  gap-2'>
            <p className=' mb-1 text-muted-foreground text-sm'>Color</p>
            <div className='flex flex-row items-center justify-end gap-4'>
              {p.colors.map((c) => (
                <div
                  key={c}
                  className={cn(
                    ' rounded-full outline-1 outline-gray-200 cursor-pointer',
                    selectedColor === c && 'outline-2 outline-gray-500 shadow'
                  )}
                  style={{ backgroundColor: c, width: 20, height: 20 }}
                  onClick={() => setSelectedColor(c)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <span className='text-xl font-medium flex items-center'>
            ${` ${p.price.toFixed(2)}`}
          </span>
          <Button
            onClick={handleAddToCart}
            variant={'outline'}
            className='shadow hover:bg-accent-foreground hover:text-accent'
          >
            {' '}
            <ShoppingCart /> <span>Add to cart </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
