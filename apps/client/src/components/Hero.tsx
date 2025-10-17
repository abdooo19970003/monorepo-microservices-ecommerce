import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='relative aspect-[3/1] w-full mb-12'>
      <Image
        src={'/featured.png'}
        alt=' '
        fill
      />
    </div>
  )
}

export default Hero
