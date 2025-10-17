import { Facebook, Instagram, Linkedin, Mail, Twitter, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './ui/input-group'

const Footer = () => {
  return (
    <div className='mt-16 flex flex-col items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-2xl md:justify-between gap-8 md:gap-0'>
      {/* Section 1 : LOGO and User */}
      <div className='text-gray-100 flex flex-col items-center md:items-start gap-4'>
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
          <span className='text-base font-semibold tracking-widest'>
            AE-Commerce
          </span>
        </Link>
        <p className='text-sm font-light text-gray-400'>
          &copy; 2025 AE-Commerce
        </p>
        <p className='text-sm font-light text-gray-400'>All rights reserved</p>
      </div>

      {/* Section 2 : Fast Links */}
      <div className='text-gray-100 flex flex-col items-center md:items-start gap-4'>
        <h4 className='text-amber-50'>Fast Links</h4>
        <div className='flex flex-col gap-2 text-sm '>
          <Link
            className='hover:text-amber-300'
            href={'/'}
          >
            Homepage
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/contacts'}
          >
            {' '}
            Contact Us{' '}
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/terms-and-conditions'}
          >
            Terms & Conditions
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/privacy-policy'}
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Section 3 : Products  */}
      <div className='text-gray-100 flex flex-col items-center md:items-start gap-4'>
        <h4 className='text-amber-50'>Products</h4>
        <div className='flex flex-col gap-2 text-sm '>
          <Link
            className='hover:text-amber-300'
            href={'/products?popular'}
          >
            Most Popular
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/products?new'}
          >
            {' '}
            New Collections
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/products?most-sales'}
          >
            Best Sales{' '}
          </Link>
          <Link
            className='hover:text-amber-300'
            href={'/products/refund'}
          >
            Refund stratrgey
          </Link>
        </div>
      </div>

      {/* Section 3 : Social Media   */}
      <div className='text-gray-100 flex flex-col items-center md:items-start gap-4'>
        <h4 className=' mb-3 text-amber-50'>Social Media</h4>
        <div className='flex justify-center items-center flex-wrap gap-4'>
          <Link
            className=' h-4 w-4 rounded-full font-bold hover:text-amber-300'
            href={'https://x.com'}
          >
            <Twitter />
          </Link>
          <Link
            className=' h-4 w-4 rounded-full font-bold hover:text-amber-300'
            href={'https://fb.com'}
          >
            {' '}
            <Facebook />{' '}
          </Link>
          <Link
            className=' h-4 w-4 rounded-full font-bold hover:text-amber-300'
            href={'https://www.instegram.com'}
          >
            <Instagram />
          </Link>
          <Link
            className=' h-4 w-4 rounded-full font-bold hover:text-amber-300'
            href={'https://linkedin.com'}
          >
            <Linkedin />
          </Link>
        </div>
        <h4 className=' mt-1 text-amber-50'>Join Ours Newsletters</h4>
        <p className='text-sm -my-2  text-gray-300'>
          Never miss out our new offers
        </p>
        <InputGroup className=' w-full outline-1 border-gray-00'>
          <InputGroupInput placeholder='john@doe.com' />
          <InputGroupAddon>
            <InputGroupButton
              type='button'
              variant={'ghost'}
            >
              <Mail />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export default Footer
