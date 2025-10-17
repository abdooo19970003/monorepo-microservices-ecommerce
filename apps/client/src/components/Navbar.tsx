import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Searchbar from './Searchbar'
import { Bell, Home, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import CartButton from './CartButton'
import ProfileButton from './ProfileButton'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between border-b border-slate-200 pb-4 pt-2'>
      {/* LEFT */}
      <Link
        href='/'
        className='flex items-center gap-1 justify-start cursor-pointer '
      >
        <Image
          alt='logo'
          src={'/logo.png'}
          width={36}
          height={36}
          className='w-9 h-9 md:w-9 md:h-9'
        />
        <span className='text-base font-semibold tracking-widest hidden md:block'>
          AE-Commerce
        </span>
      </Link>
      {/* Right */}
      <div className='flex items-center gap-6'>
        <Searchbar />
        <Link href={'/'}>
          <Home className='w-4 h-4 text-gray-600' />
        </Link>
        <Link href={'#'}>
          <Bell className='w-4 h-4 text-gray-600' />
        </Link>
        <CartButton />
        <SignedIn>
          <ProfileButton />
        </SignedIn>
        <SignedOut>
          <Button
            asChild
            variant={'ghost'}
          >
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  )
}

export default Navbar
