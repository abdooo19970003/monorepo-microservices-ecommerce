'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
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

const cateegories = [
  'General',
  'T-Shirts',
  'Shoes',
  'Pants',
  'Accessories',
  'Jackets',
  'Gloves',
  'Hats',
  'Watches',
  'Bags',
  'Sunglasses',
]
const sizes = [
  'NoSize',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
]

const colors = [
  'NoColor',
  'White',
  'Black',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Brown',
  'Gray',
  'Silver',
  'Gold',
]

export const newProductSchema = z
  .object({
    name: z.string().min(3).max(50),
    price: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, 'should be a number')
      .min(1),
    shortDescription: z.string().min(3).max(100),
    description: z.string().min(3).max(1000),
    category: z.enum(cateegories),
    colors: z.array(z.enum(colors)),
    sizes: z.array(z.enum(sizes)),
    images: z.record(z.string(), z.string().min(1, 'Image is required')),
  })
  .superRefine((data, ctx) => {
    for (const color of data.colors) {
      if (!data.images[color]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['images', color],
          message: `image is required for ${color} color`,
        })
      }
    }
  })
export type NewProductFormType = z.infer<typeof newProductSchema>

const NewProductForm = () => {
  const form = useForm<NewProductFormType>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      category: '',
      colors: [],
      sizes: [],
      images: {},
      name: '',
      price: '',
      shortDescription: '',
      description: '',
    },
  })

  const submitHandler = (values: NewProductFormType) => {
    console.log(values)
  }

  return (
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
              name='category'
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
                        {cateegories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                          >
                            {category}
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
                    <Input {...field} />
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
                              {...field}
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
                                style={{ background: color }}
                                className='h-6 w-6 rounded-sm'
                              ></span>
                              <span className='col-span-2'>{color}</span>
                              <Input
                                type='file'
                                accept='images/*'
                                className='col-span-6'
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  )
                                    form.setValue('images', {
                                      ...form.getValues().images,
                                      [color]: e.target.files[0]
                                        ? e.target.files[0].name
                                        : '',
                                    })
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
        >
          Create
        </Button>
      </form>
    </Form>
  )
}

export default NewProductForm
