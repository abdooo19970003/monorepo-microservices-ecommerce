import AppAreaChart from '../../../../components/AppAreaChart'
import EditUser from '../../../../components/EditUser'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb'
import { Button } from '../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '../../../../components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../../components/ui/hover-card'
import { Progress } from '../../../../components/ui/progress'
import { Sheet, SheetTrigger } from '../../../../components/ui/sheet'
import {
  BadgeCheck,
  BugOff,
  Camera,
  CheckCircle,
  Code,
  Gavel,
  GitBranch,
  Lock,
  LucideHome,
  Rocket,
  Shield,
  Users,
} from 'lucide-react'
import React from 'react'

function getContrastingTailwindColors() {
  const colorPairs = [
    { bg: 'bg-red-600/70', text: 'text-white' },
    { bg: 'bg-orange-500/70', text: 'text-black' },
    { bg: 'bg-yellow-400/70', text: 'text-black' },
    { bg: 'bg-green-600/70', text: 'text-white' },
    { bg: 'bg-teal-500/70', text: 'text-white' },
    { bg: 'bg-blue-700/70', text: 'text-white' },
    { bg: 'bg-indigo-600/70', text: 'text-white' },
    { bg: 'bg-purple-700/70', text: 'text-white' },
    { bg: 'bg-pink-600/70', text: 'text-white' },
    { bg: 'bg-gray-800/70', text: 'text-white' },
    { bg: 'bg-slate-200/70', text: 'text-black' },
    { bg: 'bg-amber-500/70', text: 'text-black' },
    { bg: 'bg-lime-500/70', text: 'text-black' },
    { bg: 'bg-emerald-700/70', text: 'text-white' },
    { bg: 'bg-cyan-600/70', text: 'text-white' },
    { bg: 'bg-sky-500/70', text: 'text-white' },
    { bg: 'bg-violet-700/70', text: 'text-white' },
    { bg: 'bg-fuchsia-600/70', text: 'text-white' },
    { bg: 'bg-rose-600/70', text: 'text-white' },
  ]

  const index = Math.floor(Math.random() * colorPairs.length)
  return colorPairs[index]
}

const SingleUserPage = () => {
  const username = 'abdullah'
  const badgesData = [
    {
      title: 'admin',
      description: 'Full access to all system features',
      id: 1,
      icon: Shield,
    },
    {
      title: 'verified user',
      description: 'Identity confirmed by platform moderators',
      id: 2,
      icon: CheckCircle,
    },
    {
      title: 'developer',
      description: 'Builds and maintains core application logic',
      id: 3,
      icon: Code,
    },
    {
      title: 'contributor',
      description: 'Actively shares content or code updates',
      id: 4,
      icon: GitBranch,
    },
    {
      title: 'moderator',
      description: 'Manages user activity and enforces rules',
      id: 5,
      icon: Gavel,
    },
    {
      title: 'early adopter',
      description: "Joined during platform's beta phase",
      id: 6,
      icon: Rocket,
    },
    {
      title: 'bug hunter',
      description: 'Reports and documents system bugs reliably',
      id: 7,
      icon: BugOff,
    },
    {
      title: 'community helper',
      description: 'Frequently assists other users with issues',
      id: 8,
      icon: Users,
    },
    {
      title: 'content creator',
      description: 'Publishes original media or educational posts',
      id: 9,
      icon: Camera,
    },
    {
      title: 'security advisor',
      description: 'Provides insights on platform vulnerabilities',
      id: 10,
      icon: Lock,
    },
  ]

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>
              <LucideHome className='h-4 w-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/users'>Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/users/${username}`}
              className='capitalize'
            >
              {username}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='container mt-4 flex flex-col xl:flex-row gap-8'>
        {/* LEFT */}
        <div className='w-full xl:w-1/3 space-y-6'>
          {/* User's Badges */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <h1 className='text-xl mb-6 font-semibold'>Badges</h1>
            <div className='flex gap-4 justify-center flex-wrap items-center mb-4 '>
              {badgesData.map((badge) => {
                const colors = getContrastingTailwindColors()
                return (
                  <HoverCard key={badge.id}>
                    <HoverCardTrigger>
                      <badge.icon
                        size={40}
                        className={`rounded-full p-2 hover:text-pink-500 border-2 font-bold ${colors?.bg} ${colors?.text}`}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent asChild>
                      <Card className='p-1 px-0'>
                        <CardContent>
                          <CardTitle>{badge.title}</CardTitle>
                          <CardDescription>{badge.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </HoverCardContent>
                  </HoverCard>
                )
              })}
            </div>
          </div>
          {/* User Card */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <div className='flex gap-4 mb-6'>
              <Avatar className='size-12'>
                <AvatarFallback>AE</AvatarFallback>
                <AvatarImage
                  src={
                    'https://avatars.githubusercontent.com/u/70283286?v=4&size=64'
                  }
                />
              </Avatar>
              <div className='flex-1 flex flex-col '>
                <span className='text-xl font-semibold '>Abdullah Elkıse</span>
                <span className='text-muted-foreground text-sm'>
                  Pro Web Developer
                </span>
              </div>
            </div>
            <p className='indent-5 line-clamp-2'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
              expedita quisquam laborum tempore, minima dolore repudiandae quasi
              animi alias sed numquam laudantium. Atque dignissimos error
              nesciunt, a explicabo repellendus omnis.
            </p>
          </div>
          {/* User's Information */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl mb-6 font-semibold'>User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit User</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className='space-y-3 mt-4'>
              <div className='flex flex-col gap-2 mb-8'>
                <p className='text-muted-foreground text-sm capitalize'>
                  profile completion{' '}
                </p>
                <div className='flex items-center gap-2.5 w-full'>
                  <Progress
                    className='flex-1 '
                    value={80}
                  />
                  <span className='text-muted-foreground text-sm'>80%</span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Full name :</span>
                <span className=''>Abdullah Elkuse</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Email :</span>
                <span className=''>abdullah.elkuse@gmail.com</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Phone :</span>
                <span className=''>+90 (555) 555 444 33-21</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Address :</span>
                <span className=''>Main st. 12/22</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>City :</span>
                <span className=''>Aleppo</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Role :</span>
                <span className='flex gap-1 items-center bg-accent-foreground rounded-full text-accent py-[2px] px-2 font-bold text-sm '>
                  <span>Admin</span>{' '}
                  <BadgeCheck className='w-6 h-6 text-white bg-green-700 rounded-full p-[3px] ' />{' '}
                </span>
              </div>
              <p className='text-sm text-muted-foreground mt-4'>
                Joined on 07 October 2023{' '}
              </p>
            </div>
          </div>

          {/* Card List Information */}
          {/* <div className='bg-primary-foreground p-4 rounded-lg'>
            <CardList title='latestTransactions' />
          </div> */}
        </div>
        {/* RIGHT */}
        <div className='w-full xl:w-2/3 space-y-6'>
          {/* Chart Container */}
          <div className='bg-primary-foreground p-4 rounded-lg'>
            {' '}
            <AppAreaChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserPage
