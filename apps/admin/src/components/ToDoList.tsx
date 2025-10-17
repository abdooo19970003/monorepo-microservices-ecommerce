'use client'
import React, { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { cn } from '../lib/utils'
import { Calendar } from './ui/calendar'
import { Popover } from './ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import { format, formatters } from 'date-fns'

const dummyData = [
  { id: 1, label: 'Buy groceries', checked: false },
  { id: 2, label: 'Finish React component', checked: true },
  { id: 3, label: 'Schedule team meeting', checked: false },
  { id: 4, label: 'Update Docker image', checked: true },
  { id: 5, label: 'Write unit tests', checked: false },
  { id: 6, label: 'Push code to GitHub', checked: true },
  { id: 7, label: 'Review pull requests', checked: false },
  { id: 8, label: 'Optimize regex patterns', checked: true },
  { id: 9, label: 'Clean up workspace', checked: false },
  { id: 10, label: 'Configure firewall rules', checked: true },
  { id: 11, label: 'Test Kafka cluster', checked: false },
  { id: 12, label: 'Document API endpoints', checked: true },
  { id: 13, label: 'Refactor legacy code', checked: false },
  { id: 14, label: 'Backup local files', checked: true },
  { id: 15, label: 'Update system scripts', checked: false },
  { id: 16, label: 'Check network discovery', checked: true },
  { id: 17, label: 'Validate form inputs', checked: false },
  { id: 18, label: 'Deploy staging build', checked: true },
  { id: 19, label: 'Analyze user feedback', checked: false },
  { id: 20, label: 'Plan next sprint', checked: true },
]

const ToDoList = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <h1 className='text-lg mb-6 font-medium'>To Do List</h1>

      {/* Calendar  */}
      <div className='mb-4 flex justify-between items-center'>
        <div>
          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className='mx-auto'
              >
                Select Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-10'>
              <Calendar
                className='  shadow/5 dark:shadow-white'
                mode='single'
                selected={date}
                onSelect={(date) => {
                  setDate(date)
                  setOpen(false)
                }}
                weekStartsOn={6} // saturday is first day of the week
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>{format(date || new Date(), 'dd MMMM yyyy  ')}</div>
      </div>
      {/* ToDo list  */}
      <ScrollArea className='max-h-[400px] mt-4 overflow-y-auto '>
        <div className='flex flex-col gap-4'>
          {dummyData.map((item) => (
            <Card
              key={item.id}
              className='p-4'
            >
              <div className='flex items-center gap-4'>
                <Checkbox
                  defaultChecked={item.checked}
                  id={item.id.toString()}
                />
                <label
                  htmlFor={item.id.toString()}
                  className={cn('font-medium text-sm')}
                >
                  {item.label}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ToDoList
