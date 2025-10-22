import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <SignIn />
    </div>
  )
}

export default SignInPage
