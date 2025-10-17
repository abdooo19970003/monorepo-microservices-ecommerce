'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const shippingFormSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.email(),
  phone: z
    .string()
    .min(7)
    .max(25)
    .regex(/^\d+$/, 'Phone Number must & only contains numbers '),
  address: z.string().min(1),
  city: z.string(),
})
export type shippingFormInput = z.infer<typeof shippingFormSchema>

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (values: shippingFormInput) => void
}) => {
  const form = useForm<shippingFormInput>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
    },
    mode: 'onChange',
  })
  const router = useRouter()
  const handSubmite = (values: shippingFormInput) => {
    console.log(values)
    setShippingForm(values)
    router.push('/cart?step=3', { scroll: false })
  }
  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(handSubmite)}
      >
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <Label>Name</Label>
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
          name={'email'}
          render={({ field }) => (
            <FormItem>
              <Label>E-mail</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='john@doe.com'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'phone'}
          render={({ field }) => (
            <FormItem>
              <Label>Phone</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='05554443322'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'address'}
          render={({ field }) => (
            <FormItem>
              <Label>Address</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Wall street 12/01'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'city'}
          render={({ field }) => (
            <FormItem>
              <Label>City</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder='NewYork City'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
        >
          Continue <ArrowRight />
        </Button>
      </form>
    </Form>
  )
}

export default ShippingForm
