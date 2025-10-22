'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { toast } from 'sonner'
import { Textarea } from './ui/textarea'
import { type NewCategoryFormType, newCategorySchema } from '@repo/types'
import { useAuth } from '@clerk/nextjs'
import { useMutation } from '@tanstack/react-query'

const NewCategorySheet = () => {
  const form = useForm<NewCategoryFormType>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { getToken } = useAuth()
  const mutation = useMutation({
    mutationFn: async (values: NewCategoryFormType) => {
      const token = await getToken()
      if (!token) {
        throw new Error('Unauthorized')
      }
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        throw new Error('Faild to create category')
      }
    },
    onError: (error) => {
      toast.error('Faild to create category', {})
    },
    onSuccess: () => {
      form.reset()
      toast.success('Category created successfully')
    },
  })
  const submitHandler = (values: NewCategoryFormType) => {
    mutation.mutate(values)
    console.log(values)
    form.reset()
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add New Category</SheetTitle>
      </SheetHeader>
      <SheetDescription asChild>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='w-full'
              type='submit'
              disabled={mutation.isLoading}
            >
              Create
            </Button>
          </form>
        </Form>
      </SheetDescription>
    </SheetContent>
  )
}

export default NewCategorySheet
