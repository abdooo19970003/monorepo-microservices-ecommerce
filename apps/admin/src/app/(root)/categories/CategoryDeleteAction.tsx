import { useAuth } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import { DropdownMenuItem } from '../../../components/ui/dropdown-menu'
import { Trash2 } from 'lucide-react'

const CategoryDeleteAction = ({ id }: { id: string }) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      if (!token) {
        throw new Error('Unauthorized')
      }
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      toast.success('Category deleted successfully')
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })

  return (
    <DropdownMenuItem onClick={() => mutation.mutate(id)}>
      <Trash2 />
      <span>Delete</span>
    </DropdownMenuItem>
  )
}

export default CategoryDeleteAction
