'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../../../components/ui/button'
import { ArrowUpRightIcon } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '../../../components/ui/empty'

const UnAuthorizedPage = () => {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Not Authorized</EmptyTitle>
          <EmptyDescription>
            You are not authorized to access this page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className='flex gap-2'>
            <SignedIn>
              <Button asChild>
                <SignOutButton />
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
            </SignedOut>

            <Button
              variant='outline'
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </EmptyContent>
        <Button
          variant='link'
          asChild
          className='text-muted-foreground'
          size='sm'
        >
          <a href='#'>
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </div>
  )
}

export default UnAuthorizedPage
