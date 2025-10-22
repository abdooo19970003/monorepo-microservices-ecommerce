'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { ScrollArea } from './ui/scroll-area'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getData as getCategories } from '../app/(root)/categories/data'
import {
  colors,
  NewProductFormType,
  newProductSchema,
  sizes,
} from '@repo/types'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { uploadProductImage } from '../lib/server-utils'
import { cn } from '../lib/utils'

const NewProductForm = () => {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const form = useForm({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: '',
      price: '',
      shortDescription: '',
      description: '',
      categorySlug: '',
      colors: [],
      sizes: [],
      images: {},
    },
  })
  const { getToken } = useAuth()
  const submitHandler = useMutation({
    mutationFn: async (values: NewProductFormType) => {
      const token = await getToken()
      if (!token) {
        throw new Error('Unauthorized')
      }
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        toast.error('Faild to create product')
        throw new Error('Faild to create product')
      }
      return await response.json()
    },
    onError: (error) => {
      toast.error('Faild to create product')
    },
    onSuccess: () => {
      form.reset()
      toast.success('Product created successfully')
    },
  })

  const imageUrls: Record<string, string> = form.watch(`images`)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => submitHandler.mutate(values))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ScrollArea className='max-h-[72vh] overflow-y-scroll  '>
          <div className='flex flex-col gap-8'>
            <FormField
              control={form.control}
              name='categorySlug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.data?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.slug}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={String(field.value ?? '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='shortDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={10}
                    />
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
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={25}
                      className='min-h-[120px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sizes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-4 gap-3 my-2'>
                      {sizes.map((size) => (
                        <div
                          key={size}
                          className='flex gap-1 '
                        >
                          <Checkbox
                            {...field}
                            id={size}
                            checked={field.value.includes(size)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value
                              if (checked) {
                                field.onChange([...currentValues, size])
                              } else {
                                field.onChange(
                                  currentValues.filter(
                                    (value) => value !== size
                                  )
                                )
                              }
                            }}
                            value={size}
                          />{' '}
                          <Label htmlFor={size}>{size}</Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='colors'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 gap-3 my-2'>
                        {colors.map((color) => (
                          <div
                            key={color}
                            className='flex  gap-1 '
                          >
                            <Checkbox
                              id={color}
                              checked={field.value.includes(color)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value
                                if (checked) {
                                  field.onChange([...currentValues, color])
                                } else {
                                  field.onChange(
                                    currentValues.filter(
                                      (value) => value !== color
                                    )
                                  )
                                }
                              }}
                              value={color}
                            />{' '}
                            <Label
                              htmlFor={color}
                              className='flex items-center gap-2'
                            >
                              <span
                                style={{ background: color }}
                                className='h-4 w-4 ms-2 rounded-sm'
                              >
                                {' '}
                              </span>{' '}
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {field.value && field.value.length > 0 && (
                        <div className='mt-8 space-y-4'>
                          <p className='text-sm font-medium'>
                            Upload images for selected Colors
                          </p>
                          {field.value.map((color) => (
                            <div
                              key={color}
                              className='grid grid-cols-9 items-center'
                            >
                              <span
                                style={{
                                  backgroundColor: color,
                                  backgroundImage: `url(${imageUrls?.[color]})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                }}
                                className='h-6 w-6 rounded-sm'
                              ></span>
                              <span className='col-span-2'>{color}</span>
                              <Input
                                type='file'
                                accept='image/*'
                                className={cn(
                                  'col-span-6 border-2 transition-colors duration-300',
                                  imageUrls?.[color]
                                    ? 'border-green-500'
                                    : 'border-red-500'
                                )}
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    uploadProductImage(file)
                                      .then((url) => {
                                        form.setValue(`images.${color}`, url)
                                      })
                                      .catch((err) => toast.error(err.message))
                                  }
                                }}
                              />
                              <p className='text-red-500 col-span-9 text-end'>
                                {form.formState.errors.images?.[color]?.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <Button
          className='w-full'
          type='submit'
          disabled={submitHandler.isPending}
        >
          {submitHandler.isPending ? (
            <>
              <Loader />
              Creating
            </>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default NewProductForm
