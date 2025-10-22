'use client'
import { LogOut, Moon, Settings, Sun, User, ListIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { SidebarTrigger } from './ui/sidebar'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { setTheme } = useTheme()
  return (
    <nav className='flex justify-between items-center p-4'>
      <SidebarTrigger className='' />
      <div className='flex  items-center gap-4'>
        <Link href='/'>Dashboard</Link>

        {/* Theme Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
            >
              <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Profile Menu */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>AE</AvatarFallback>
              <AvatarImage
                src={
                  'https://avatars.githubusercontent.com/u/70283286?v=4&size=64'
                }
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className=' h-[1.2rem] w-[1.2rem] me-2' />{' '}
              <span>Profile</span>{' '}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className=' h-[1.2rem] w-[1.2rem] me-2' />{' '}
              <span>Settings</span>{' '}
            </DropdownMenuItem>
            <DropdownMenuItem variant='destructive'>
              <LogOut className=' h-[1.2rem] w-[1.2rem] me-2' />{' '}
              <span>Logout</span>{' '}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  )
}

export default Navbar
