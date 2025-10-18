'use client'
import React, { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './ui/input-group'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set('search', searchQuery)
    router.push(`/products?${params}`, { scroll: false })
  }
  return (
    <form onSubmit={handleSearch}>
      <InputGroup className='hidden md:flex  w-full outline-0 shadow-md '>
        <InputGroupInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search...'
        />
        <InputGroupAddon>
          <InputGroupButton
            type='submit'
            variant={'ghost'}
          >
            <Search />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

export default Searchbar
