import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { LucideHome } from 'lucide-react'
import { getUsersData } from './data'
import { UsersDataTable } from './data-table'
import { PaymentColumns } from './columns'
import { auth } from '@clerk/nextjs/server'

const UsersPage = async () => {
  const { getToken } = await auth()
  const token = await getToken()
  if (!token) {
    console.log('Not Authanticated')
  }
  const { data } = await getUsersData(token!)
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
            <BreadcrumbLink href='/users'>Users</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-lg'>
        <h1 className='text-lg font-semibold'>All Users</h1>
        <div className=''>
          <UsersDataTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default UsersPage
