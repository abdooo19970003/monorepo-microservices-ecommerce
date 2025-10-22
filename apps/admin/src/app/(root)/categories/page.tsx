'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { LucideHome } from 'lucide-react'
import { getData } from './data'
import { ProductsDataTable } from './data-table'
import { PaymentColumns } from './columns'
import { useQuery } from '@tanstack/react-query'

const CategiesPage = () => {
  const getCategories = useQuery({
    queryKey: ['categories'],
    queryFn: getData,
  })
  const data = getCategories
  const columns = PaymentColumns
  return (
    <div>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>
              <LucideHome className='h-4 w-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/categories'>Categories</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-lg'>
        <h1 className='text-lg font-semibold'>All Categories</h1>
        <div className=''>
          {data.isLoading && <div>Loading...</div>}
          {data.isError && <div>Error: {data.error as string}</div>}
          {data.data && (
            <ProductsDataTable
              columns={columns}
              data={data.data}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategiesPage
