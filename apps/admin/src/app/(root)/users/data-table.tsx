'use client'
import { Button } from '../../../components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '../../../components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import {
  type ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface PaymentsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function PaymentsDataTable<TData, TValue>({
  columns,
  data,
}: PaymentsDataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<{
    pageIndex: number
    pageSize: number
  }>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: { pagination, sorting: sorting as SortingState, rowSelection },
  })
  // console.log(rowSelection)

  return (
    <div className='rounded-md '>
      {Object.keys(rowSelection).length > 0 && (
        <div className='flex justify-end'>
          <Button variant='outline'>
            Delete{' '}
            <span className='text-red-500 text-lg'>
              {Object.keys(rowSelection).length}
            </span>{' '}
            Users
            <Trash2 />
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getPaginationRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className='hover:bg-accent-foreground/20'
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-8 flex justify-between items-center bg-accent-foreground/10 rounded-full '>
        <Pagination className='mx-0 px-0 select-none'>
          <PaginationContent className='px-0'>
            <PaginationItem className='px-0'>
              <Button
                variant={'ghost'}
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
              >
                <ChevronsLeft /> First
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant={'ghost'}
                disabled={!table.getCanPreviousPage()}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    pageIndex: pagination.pageIndex - 1,
                  })
                }
              >
                <ChevronLeft />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className='font-semibold '>
                Page: {pagination.pageIndex + 1}
              </span>
            </PaginationItem>

            <PaginationItem>
              <Button
                onClick={() =>
                  setPagination({
                    ...pagination,
                    pageIndex: pagination.pageIndex + 1,
                  })
                }
                variant={'ghost'}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                onClick={() => table.lastPage()}
                variant={'ghost'}
                disabled={!table.getCanNextPage()}
              >
                Last
                <ChevronsRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className='flex gap-2 justify-end '>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <Button
              key={pageSize}
              variant={'ghost'}
              onClick={() => setPagination({ ...pagination, pageSize })}
              disabled={pagination.pageSize === pageSize}
            >
              {pageSize}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
