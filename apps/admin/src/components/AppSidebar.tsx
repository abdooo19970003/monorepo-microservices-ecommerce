import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronDown,
  ChevronUp,
  Code,
  HandHelping,
  HelpCircle,
  Home,
  Inbox,
  LucideTable,
  Package,
  PackagePlus,
  Plus,
  Search,
  User2,
  UserPlus,
  Users,
} from 'lucide-react'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from './ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Collapsible, CollapsibleContent } from './ui/collapsible'
import { Sheet, SheetTrigger } from './ui/sheet'
import NewProductSheet from './NewProductSheet'
import NewCategorySheet from './NewCategorySheet'
import NewUserSheet from './NewUserSheet'
import NewOrderSheet from './NewOrderSheet'

const AppSidebar = () => {
  const items = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Inbox', url: '/inbox', icon: Inbox },
    { title: 'Search', url: '#', icon: Search },
  ]
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='min-h-[4rem] py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='flex items-center gap-1 px-2'>
              <Link
                href='/'
                className='flex items-center justify-center gap-2 text-xl  '
              >
                <Image
                  alt='AE Logo'
                  src={'/logo.png'}
                  width={20}
                  height={20}
                  className='ms-2 self-center '
                />
                <span className='ms-2 font-semibold'>AE Insight</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === 'Inbox' && (
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <Sheet>
            <SheetTrigger asChild>
              <SidebarGroupAction>
                <Plus />
                <span className='sr-only'>New User</span>
              </SidebarGroupAction>
            </SheetTrigger>
            <NewUserSheet />
          </Sheet>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/users'>
                    <Users />
                    <span>All Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton>
                      <UserPlus />
                      <span>New User</span>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <NewUserSheet />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <Sheet>
            <SheetTrigger asChild>
              <SidebarGroupAction>
                <Plus />
                <span className='sr-only'>New Product</span>
              </SidebarGroupAction>
            </SheetTrigger>
            <NewProductSheet />
          </Sheet>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/products'>
                    <Package />
                    <span>See All Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton>
                      <Plus />
                      <span>New Product</span>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <NewProductSheet />
                </Sheet>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href='/categories'>
                  <SidebarMenuButton>
                    <LucideTable />
                    <span>All Categories</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton>
                      <Plus />
                      <span>New Category</span>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <NewCategorySheet />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Orders & Paymensts</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/orders'>
                    <BanknoteArrowDown />
                    <span>All Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton>
                      <PackagePlus />
                      <span>New Order</span>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <NewOrderSheet />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible className='transition-all duration-300 ease-in-out'>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <span>Help</span>
                <ChevronDown className='ml-auto' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/help/faq'>
                        <HelpCircle />
                        <span>FAQ</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/docs'>
                        <Code />
                        <span>Docs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/help'>
                        <HandHelping />
                        <span>Support</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>Abdullah Elkuse</span>
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                side='top'
                className='w-full'
              >
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem variant='destructive'>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
