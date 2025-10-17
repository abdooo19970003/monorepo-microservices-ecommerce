import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 text-center text-xl font-semibold w-full'>
      <h2 className='text-9xl font-extrabold tracking-tighter leading-90'>
        Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Link
        href='/'
        className='text-accent-foreground'
      >
        Return Home
      </Link>
    </div>
  )
}
