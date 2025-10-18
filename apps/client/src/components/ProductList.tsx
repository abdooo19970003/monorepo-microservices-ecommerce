import React, { Suspense } from 'react'
import { getProductsData } from '../data'
import { ProductType } from '@repo/types'
import Categories from './Categories'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRightFromLine } from 'lucide-react'
import Filters from './Filters'

const ProductList = async ({
  category,
  params,
  sort,
  search,
}: {
  category?: string
  params: 'Home' | 'Products'
  sort?: string
  search?: string
}) => {
  const data = await getProductsData({ category, params, sort, search })

  return (
    <div className='w-full'>
      <Categories />
      {params === 'Products' && <Filters />}

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 '>
        {data.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
          />
        ))}
      </div>
      <Button
        asChild
        variant={'link'}
        className='flex justify-end mt-4 underline text-sm text-gray-500'
      >
        <Link href={category ? `/products/?category=${category}` : 'products'}>
          View All Products <ArrowRightFromLine />
        </Link>
      </Button>
    </div>
  )
}

export default ProductList
