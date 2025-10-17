'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export const paymentFormSchema = z.object({
  cartHolder: z.string().min(1),
  cardNumber: z
    .string()
    .regex(
      /^(?:\d{4}[- ]?){3}\d{4}$|^3[47]\d{13}$/,
      'please write a valid card number'
    ),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/,
      'please write a valid expiration date'
    ),
  cvv: z.string().regex(/^\d{3,4}$/, 'please write a valid CVV code'),
})

export type PaymentFormInput = z.infer<typeof paymentFormSchema>

const PaymentForm = () => {
  const form = useForm<PaymentFormInput>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cartHolder: '',
      cvv: '',
      expirationDate: '',
    },
  })
  const handleSubmite = (values: PaymentFormInput) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(handleSubmite)}
      >
        <FormField
          control={form.control}
          name='cartHolder'
          render={({ field }) => (
            <FormItem>
              <Label>Name on Card </Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='John Doe'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cardNumber'
          render={({ field }) => (
            <FormItem>
              <Label>Card Number</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='5500-0000-0000-0004'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='expirationDate'
          render={({ field }) => (
            <FormItem>
              <Label>Expiration Date</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='10/30'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cvv'
          render={({ field }) => (
            <FormItem>
              <Label>CVV</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='xxx'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-1'>
          <Image
            alt='klarna'
            src={'/klarna.png'}
            width={40}
            height={20}
            className='rounded-xs'
          />
          <Image
            alt='cards'
            src={'/cards.png'}
            width={40}
            height={20}
            className='rounded-xs'
          />

          <Image
            alt='stripe'
            src={'/stripe.png'}
            width={40}
            height={20}
            className='rounded-xs'
          />
        </div>
        <Button
          type='submit'
          className='w-full'
        >
          Check out <ShoppingCart />
        </Button>
      </form>
    </Form>
  )
}

export default PaymentForm
