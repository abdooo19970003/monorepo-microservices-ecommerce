import AppSidebar from '../../components/AppSidebar'
import Navbar from '../../components/Navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex w-full'>
        <AppSidebar />
        <main className='min-h-screen w-full p-0 m-0'>
          <Navbar />
          <div className='px-4'>{children}</div>
        </main>
      </div>
    </>
  )
}

export default RootLayout
