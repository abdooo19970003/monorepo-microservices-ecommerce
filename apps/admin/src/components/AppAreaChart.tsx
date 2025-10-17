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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const AppAreaChart = () => {
  return (
    <div className='w-full h-full items-center'>
      <h1 className='text-lg mb-6 font-medium'>Total Interactions</h1>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={dummyData}
        >
          <defs>
            <linearGradient
              id='fillDesktop'
              x1='0'
              y1='0'
              x2='0'
              y2={'100%'}
            >
              <stop
                color='var(--color-desktop)'
                stopColor='var(--color-desktop)'
                stopOpacity={0.8}
                offset={'5%'}
              />
              <stop
                color='var(--color-mobile)'
                stopColor='var(--color-desktop)'
                stopOpacity={0.1}
                offset={'95%'}
              />
            </linearGradient>
            <linearGradient
              id='fillMobile'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='var(--color-mobile)'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='var(--color-mobile)'
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            syncWithTicks
            stroke='#ccc'
            vertical={true}
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
          <Area
            dataKey={'desktop'}
            fill={'url(#fillDesktop)'}
            label={chartConfig.desktop.label}
            radius={3}
            type='monotone'
            fillOpacity={0.5}
          />
          <Area
            dataKey={'mobile'}
            fill='url(#fillMobile)'
            label={chartConfig.mobile.label}
            radius={3}
            type='monotone'
            fillOpacity={0.5}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default AppAreaChart
