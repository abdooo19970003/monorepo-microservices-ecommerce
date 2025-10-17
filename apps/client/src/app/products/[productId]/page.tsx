import { ProductType } from '@repo/types'
import NotFound from '../../../app/not-found'
import ProductInteraction from '../../../components/ProductInteraction'
import { productsData } from '../../../data'
import Image from 'next/image'
import React from 'react'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ productId: string }>
}) => {
  const { productId } = await params

  // TODO: Fetch data from database
  const productData: ProductType | undefined = productsData.find(
    (p) => p.id === productId
  )
  if (!productData) return NotFound()
  const ogImage = (productData.images as Record<string, string>)?.[
    productData.colors[0]!
  ]
  console.log(ogImage)

  return {
    title: productData.name,
    description: productData.description,
    openGraph: {
      title: productData.name,
      description: productData.description,
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      title: productData.name,
      description: productData.description,
      images: ogImage,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
const SingleProductPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ color: string; size: string }>
  params: Promise<{ productId: string }>
}) => {
  const { color, size } = await searchParams
  const { productId } = await params
  const id = productId
  const productData = productsData.find((p) => p.id === id)
  if (!productData) return NotFound()
  return (
    <div className='flex flex-col lg:flex-row gap-4 md:gap-12 mt-12'>
      {/* IMAGE */}
      <div className='w-full lg:w-5/12 relative aspect-[2/3]'>
        <Image
          src={(productData.images as Record<string, string>)?.[color!] || ''}
          alt={productData.name}
          fill
          className='object-contain rounded-md shadow'
        />
      </div>
      {/* DETAILS */}
      <div className='w-full lg:w-7/12 flex flex-col gap-4 '>
        <h1 className='font-medium text-2xl'>{productData.name}</h1>
        <p className='text-gray-500'>{productData.description}</p>
        <p className='text-2xl font-semibold'>
          {productData.price.toFixed(2)}$
        </p>
        <ProductInteraction
          product={productData}
          size={size}
          color={color}
        />
        <div className='flex items-center gap-2 mt-4'>
          <Image
            alt='klarna'
            src={'/klarna.png'}
            width={60}
            height={30}
            className='rounded-sm'
          />
          <Image
            alt='cards'
            src={'/cards.png'}
            width={60}
            height={30}
            className='rounded-sm'
          />

          <Image
            alt='stripe'
            src={'/stripe.png'}
            width={60}
            height={30}
            className='rounded-sm'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-500 text-xs'>
            By clicking on Pay Now you agree to our{' '}
            <span className='underline cursor-pointer hover:text-black'>
              Terms and Conditions
            </span>{' '}
            and{' '}
            <span className='underline cursor-pointer hover:text-black'>
              Privacy Policy
            </span>
            .
          </p>
          <p className='text-gray-500 text-xs'>
            Also you authrize us to charge your selected payment method for the
            total amount shown.
          </p>
          <p className='text-gray-500 text-xs'>
            All sales are subject to our return and{' '}
            <span className='underline cursor-pointer hover:text-black'>
              Refund Policies
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage
