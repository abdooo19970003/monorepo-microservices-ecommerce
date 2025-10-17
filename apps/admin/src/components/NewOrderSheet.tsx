'use client'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectValue } from './ui/select'
import { SelectTrigger } from '@radix-ui/react-select'
import { useForm } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'

export const newOrderSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'should be a number')
    .min(1),
  userId: z.string().min(1),
  status: z.enum([
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'returned',
    'failed',
  ]),
})
export type NewOrderFormType = z.infer<typeof newOrderSchema>

const NewOrderSheet = () => {
  const form = useForm<NewOrderFormType>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      amount: '',
      userId: '',
      status: 'pending',
    },
  })

  const submitHandler = (values: NewOrderFormType) => {
    console.log(values)
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add New Order</SheetTitle>
      </SheetHeader>
      <SheetDescription asChild>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UserId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl className='w-full'>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <SelectTrigger className='outline py-1 rounded-md bg-accent flex justify-between px-3'>
                        <SelectValue placeholder='Select Status' />{' '}
                        <ChevronDown />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='processing'>Processing</SelectItem>
                        <SelectItem value='shipped'>Shipped</SelectItem>
                        <SelectItem value='delivered'>Delivered</SelectItem>
                        <SelectItem value='cancelled'>Cancelled</SelectItem>
                        <SelectItem value='returned'>Returned</SelectItem>
                        <SelectItem value='failed'>Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full'
              type='submit'
            >
              Create
            </Button>
          </form>
        </Form>
      </SheetDescription>
    </SheetContent>
  )
}

export default NewOrderSheet
