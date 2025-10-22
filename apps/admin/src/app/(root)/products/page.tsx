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

const UsersPage = async () => {
  const data = await getData()
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
            <BreadcrumbLink href='/products'>Products</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-lg'>
        <h1 className='text-lg font-semibold'>All Products</h1>
        <div className=''>
          <ProductsDataTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default UsersPage
