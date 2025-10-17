import React from 'react'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import NewProductForm from './NewProductForm'

const NewProductSheet = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add New Product</SheetTitle>
      </SheetHeader>
      <SheetDescription asChild>
        <NewProductForm />
      </SheetDescription>
    </SheetContent>
  )
}

export default NewProductSheet
