'use client'
import React from 'react'
import { Button } from '../../../components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

const DeleteUserButton = ({ id }: { id: string }) => {
  const { getToken } = useAuth()

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      const url = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${id}`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        throw new Error('Failed to delete user')
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error('Failed to delete user')
    },
    onSuccess: () => {
      toast.success('User deleted successfully')
    },
  })

  return (
    <Button
      disabled={deleteMutation.isLoading}
      onClick={() => deleteMutation.mutate(id)}
      variant={'ghost'}
    >
      <Trash2 />
      Delete User
    </Button>
  )
}
export const DeleteUsersButton = ({
  rowSelection,
}: {
  rowSelection: Promise<string[]>
}) => {
  const { getToken } = useAuth()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('No token found')
      }
      const url = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/`
      const IDs = await rowSelection
      for (const id of IDs) {
        const res = await fetch(url + id, {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error('Failed to delete user: ' + id)
        }
      }
    },
    onError: (error) => {
      toast.error('Failed to delete user')
    },
    onSuccess: () => {
      toast.success('User deleted successfully')
    },
  })

  return (
    <Button
      disabled={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate()}
      variant={'outline'}
    >
      {deleteMutation.isPending ? (
        <span>Deleting...</span>
      ) : (
        <>
          Delete User(s)
          <Trash2 />
        </>
      )}
    </Button>
  )
}

export default DeleteUserButton
