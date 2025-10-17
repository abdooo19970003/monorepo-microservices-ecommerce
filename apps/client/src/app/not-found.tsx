import { Button } from '../components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../components/ui/empty'
import { Icon, Library } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia
            variant='icon'
            className='relative w-36 h-36 '
          >
            <Image
              fill
              src={'/404.png'}
              alt='404'
            />
          </EmptyMedia>
          <EmptyTitle>404 Page Not Found</EmptyTitle>
          <EmptyDescription>
            <p>This page not implemnted yet,</p>
            <p>
              Our devleoper team working hard to make it ready to use as soon as
              possible{' '}
            </p>
            <p className='mt-5'>Thanks for your patience</p>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={'/'}>Back Home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
