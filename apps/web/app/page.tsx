import Image, { type ImageProps } from 'next/image'
import { Button } from '@repo/ui/button'
import styles from './page.module.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ProfileButton from '../components/ProfileButton'
import Link from 'next/link'

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string
  srcDark: string
}

export default function Home() {
  return (
    <div>
      <main className='flex flex-col gap-3 items-center justify-around min-h-40'>
        <p className='text-4xl'>Home</p>
        <p className='text-2xl'>
          {' '}
          Link to{' '}
          <Link
            href='/orders'
            className='text-blue-500 underline'
          >
            Orders
          </Link>
        </p>
        <div className=''>
          <SignedIn>
            <ProfileButton />{' '}
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </main>
    </div>
  )
}
