import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from '../components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AE-Commerce',
  description: 'AE-Commerce Best Quality & Prices for your needs',
  keywords: ['Shopping', 'Nike', 'Puma', 'AE'],
  authors: [
    {
      name: 'Abdullah Elkuse',
      url: 'aeinsight.site',
    },
  ],
  metadataBase: new URL('https://ae-commerce.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://ae-commerce.vercel.app',
    title: 'AE-Commerce',
    description: 'AE-Commerce Best Quality & Prices for your needs',
    siteName: 'AE-Commerce',
    images: [
      {
        url: 'https://ae-commerce.vercel.app/logo.png',
        width: 50,
        height: 50,
        alt: 'AE-Commerce',
        type: 'image/png',
        secureUrl: 'https://ae-commerce.vercel.app/logo.png',
      },
      {
        url: '/featured.png',
        width: 1200,
        height: 630,
        alt: 'AE-Commerce',
        type: 'image/png',
        secureUrl: '/featured.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AE-Commerce',
    description: 'AE-Commerce Best Quality & Prices for your needs',
    images: ['./featured.png'],
    creator: '@aeinsight',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <div className='mx-auto p-4 sm:p-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl'>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}
