'use client'
import React, { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './ui/input-group'
import { Search } from 'lucide-react'

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <InputGroup className='hidden md:flex  w-full outline-0 shadow-md '>
      <InputGroupInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search...'
      />
      <InputGroupAddon>
        <InputGroupButton
          type='button'
          variant={'ghost'}
          onClick={() => alert(searchQuery)}
        >
          <Search />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export default Searchbar
