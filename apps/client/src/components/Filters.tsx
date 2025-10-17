'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { InputGroup, InputGroupAddon } from './ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const Filters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    router.push(`${pathname}?${params}`, { scroll: false })
  }
  return (
    <div className='flex  items-center gap-2 mb-2 justify-end'>
      <span className='text-muted-foreground text-sm'>Sort By :</span>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort By' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='newest'>Newest</SelectItem>
          <SelectItem value='oldest'>Oldest</SelectItem>
          <SelectItem value='asc'>Price: Low to High</SelectItem>
          <SelectItem value='desc'>Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filters
