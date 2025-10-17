'use client'
import z from 'zod'
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

export const newCategorySchema = z.object({
  name: z.string().min(3).max(50),
})
export type NewCategoryFormType = z.infer<typeof newCategorySchema>

const NewCategorySheet = () => {
  const form = useForm<NewCategoryFormType>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      name: '',
    },
  })

  const submitHandler = (values: NewCategoryFormType) => {
    console.log(values)
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

export default NewCategorySheet
