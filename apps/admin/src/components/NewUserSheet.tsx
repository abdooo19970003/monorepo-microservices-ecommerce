'use client'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { newUserFormSchema, type NewUserFormType } from '@repo/types'
import * as z from 'zod'
import { useAuth } from '@clerk/nextjs'

const NewUserSheet = () => {
  const form = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      emailAddress: [],
      phoneNumbers: [],
      password: '',
    },
  })
  const { getToken } = useAuth()
  const newUserMutation = useMutation({
    mutationFn: async (values: NewUserFormType) => {
      const token = await getToken()
      if (!token) {
        throw new Error('Unauthorized')
      }
      const url = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        throw new Error('Faild to create user')
      }
      const data = await response.json()
      console.log(data)
    },
    onError: (error: any) => {
      toast.error('Faild to create user')
      console.error(error)
    },
    onSuccess: () => {
      toast.success('User created successfully')
      form.reset()
    },
  })

  // const handlesubmit = (values: NewUserFormType) => {
  //   newUserMutation.mutate(values)
  // }
  return (
    <SheetContent className='flex flex-col  justify-center '>
      <SheetHeader>
        <SheetTitle className='mb-4'>New User</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((formData) =>
                newUserMutation.mutateAsync(formData)
              )}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Smith'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='jsmith99'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='*******'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      your password must be strong, 8-50 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='emailAddress'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john@gmail.com, jsmisth@yahoo.com , ...'
                        {...field}
                        onChange={(e) => {
                          const emails = e.target.value
                            .split(',')
                            .map((email) => email.trim())
                            .filter((email) => email)
                          field.onChange(emails)
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumbers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your contact phone no '
                        {...field}
                        onChange={(e) => {
                          const phones = e.target.value
                            .split(',')
                            .map((phone) => phone.trim())
                            .filter((phone) => phone)
                          field.onChange(phones)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full'
                disabled={newUserMutation.isLoading}
              >
                <Plus className='mr-2' />
                Create
              </Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}

export default NewUserSheet
