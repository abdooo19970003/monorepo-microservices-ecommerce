'use client'
import React from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

const dummyData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

const AppBarChart = () => {
  return (
    <div className='w-full h-full items-center'>
      <h1 className='text-lg mb-6 font-medium'>Total Revenu</h1>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={dummyData}
          barGap='3%'
        >
          <CartesianGrid
            syncWithTicks
            stroke='#ccc'
            vertical={false}
            // horizontalFill={['#000', '#111', '#222', '#333', '#444', '#555']}
          />
          <XAxis
            dataKey={'month'}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey='desktop'
            fill={chartConfig.desktop.color}
            label={chartConfig.desktop.label}
            radius={3}
          />
          <Bar
            dataKey='mobile'
            fill={chartConfig.mobile.color}
            label={chartConfig.mobile.label}
            radius={3}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default AppBarChart
