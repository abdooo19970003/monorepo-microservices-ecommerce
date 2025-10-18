import ProductList from '../../components/ProductList'
import React from 'react'

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string; search: string }>
}) => {
  const { category, sort, search } = await searchParams
  return (
    <div>
      <ProductList
        category={category}
        sort={sort}
        search={search}
        params='Products'
      />
    </div>
  )
}

export default page
