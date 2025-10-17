import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { LucideHome } from 'lucide-react'
import { getData, type Payment } from './data'
import { PaymentsDataTable } from './data-table'
import { PaymentColumns } from './columns'

const PaymentsPage = async () => {
  const data: Payment[] = await getData()
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
            <BreadcrumbLink href='/payments'>Payments</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-lg'>
        <h1 className='text-lg font-semibold'>All Payments</h1>
        <div className=''>
          <PaymentsDataTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
