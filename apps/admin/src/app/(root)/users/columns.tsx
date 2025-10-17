'use client'
import type { User } from './data'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  CheckCircle,
  MinusCircle,
  MoreHorizontal,
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar'

export const PaymentColumns: ColumnDef<User>[] = [
  {
    id: 'id',
    accessorKey: 'id',
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
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => (
      <div className=' flex justify-start gap-3 items-center'>
        <Avatar>
          <AvatarFallback>
            {String(row.getValue('fullName')).substring(0, 2)}
          </AvatarFallback>
          <AvatarImage src={row.original.image} />
        </Avatar>
        <span>{row.getValue('fullName')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell({ row }) {
      return (
        <Link href={`mailto:` + row.original.email}>{row.original.email}</Link>
      )
    },
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
      return (
        <Badge
          className={cn(
            ' capitalize text-white ',
            status === 'active' && 'bg-green-600',
            status === 'inactive' && 'bg-gray-600'
          )}
        >
          {status === 'active' && <CheckCircle className='h-6 w-6' />}
          {status === 'inactive' && <MinusCircle className='h-6 w-6' />}
          {status as string}
        </Badge>
      )
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${user.id}`}>View Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
