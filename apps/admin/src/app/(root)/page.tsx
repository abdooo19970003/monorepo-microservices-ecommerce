import { auth } from '@clerk/nextjs/server'
import AppAreaChart from '../../components/AppAreaChart'
import AppBarChart from '../../components/AppBarChart'
import AppPieChart from '../../components/AppPieChart'
import CardList from '../../components/CardList'
import ToDoList from '../../components/ToDoList'
import {
  getOrderChartData,
  getLatestOrders,
  getLatestProducts,
} from '../../lib/data'

export default async function Home() {
  const { getToken } = await auth()
  const token = await getToken()

  const orderChartData = getOrderChartData(token!)
  const latestOrders = getLatestOrders(token!)

  const latestProducts = getLatestProducts(token!)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppBarChart dataPromise={orderChartData} />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <CardList
          dataPromise={latestOrders}
          dataType='Order'
        />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <AppPieChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <ToDoList />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg lg:col-span-2  xl:col-span-1 2xl:col-span-2'>
        <AppAreaChart />
      </div>
      <div className='bg-primary-foreground p-4 rounded-lg'>
        <CardList
          dataPromise={latestProducts}
          dataType='Product'
        />
      </div>
    </div>
  )
}
