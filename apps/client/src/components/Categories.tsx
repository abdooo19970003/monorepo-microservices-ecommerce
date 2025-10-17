'use client'
import React from 'react'
import { CategoryType } from '@repo/types'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '../lib/utils'

export const categories: CategoryType[] = [
  {
    id: '1',
    name: 'All',
    slug: 'all',
    description: 'All products',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'T-shirts',
    slug: 't-shirts',
    description: 'All T-shirts',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    description: 'All Shoes',
    name: 'Shoes',
    slug: 'shoes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5fb41409',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Accessories',
    slug: 'accessories',
  },
  {
    id: '106233b6',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Bags',
    slug: 'bags',
  },
  {
    id: '4ba7766c',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Dresses',
    slug: 'dresses',
  },
  {
    id: '44c70872',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Jackets',
    slug: 'jackets',
  },
  {
    id: '17934598',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Gloves',
    slug: 'gloves',
  },
]

const Categories = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selectedCategory = searchParams.get('cat')
  const handleChange = (slug: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('cat', slug)
    router.push(`${pathname}?${params}`, { scroll: false })
  }
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-6 text-sm'>
      {categories.map((c) => (
        <div
          className={cn(
            ' flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:text-amber-500 ',
            selectedCategory === c.slug && 'bg-white'
          )}
          key={c.name}
          onClick={() => handleChange(c.slug)}
        >
          <span>{c.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Categories
