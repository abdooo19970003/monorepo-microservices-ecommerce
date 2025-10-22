'use client'
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
import { User } from '@clerk/nextjs/server'
import DeleteUserButton from './DeleteUserButton'

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
    id: 'full-name',
    header: 'Full Name',
    cell: ({ row }) => {
      const user = row.original
      const chars =
        user.firstName && user.lastName
          ? user.firstName.charAt(0) + user.lastName.charAt(0)
          : user.primaryEmailAddress?.emailAddress.charAt(0)
      const fullname = user.firstName + ' ' + user.lastName
      return (
        <div className=' flex justify-start gap-3 items-center'>
          <Avatar>
            <AvatarFallback>{chars}</AvatarFallback>
            <AvatarImage src={row.original.imageUrl} />
          </Avatar>
          <span>{fullname}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell({ row }) {
      return (
        <Link href={`mailto:` + row.original.primaryEmailAddress?.emailAddress}>
          {row.original.emailAddresses[0]?.emailAddress}
        </Link>
      )
    },
  },
  {
    accessorKey: 'banned',
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
      const status = row.getValue('banned')
      return (
        <Badge
          className={cn(
            ' capitalize text-white ',
            status === false && 'bg-green-600',
            status === true && 'bg-gray-600'
          )}
        >
          {status === false && <CheckCircle className='h-6 w-6' />}
          {status === true && <MinusCircle className='h-6 w-6' />}
          {!status ? 'Active' : 'Banned'}
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
            <DropdownMenuItem asChild>
              <DeleteUserButton id={user.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
