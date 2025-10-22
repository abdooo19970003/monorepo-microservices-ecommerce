'use client'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  Check,
  CircleDot,
  MoreHorizontal,
  PackageSearch,
  X,
} from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import Link from 'next/link'
import { Checkbox } from '../../../components/ui/checkbox'
import { OrderType } from '@repo/types'

export const PaymentColumns: ColumnDef<OrderType>[] = [
  {
    accessorKey: '_id',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) =>
      row.getValue('createdAt')
        ? new Date(row.getValue('createdAt')).toLocaleDateString('tr')
        : '-',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status')
      //"pending" | "processing" | "success" | "failed"
      return (
        <Badge
          className={cn(
            ' capitalize text-white ',
            status === 'pending' && 'bg-orange-500',
            status === 'processing' && 'bg-blue-400',
            status === 'success' && 'bg-green-600',
            status === 'failed' && 'bg-red-600'
          )}
        >
          {status === 'pending' && <CircleDot className='h-6 w-6' />}
          {status === 'processing' && <PackageSearch className='h-6 w-6' />}
          {status === 'success' && <Check className='h-6 w-6' />}
          {status === 'failed' && <X className='h-6 w-6' />}
          {status as string}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount / 100)
      return <span className='font-semibold'>{formatedAmount}</span>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className='flex justify-start'
          >
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${order.userId}`}>View customer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
