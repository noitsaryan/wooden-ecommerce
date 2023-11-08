import { AuthProvider } from '@/providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/HeaderLayout/Header'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/HeaderLayout/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WinHome',
  description: 'Decor your space with us! WinHome is an online ecommerce furniture store.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning> <AuthProvider>
        <Header />
        <NextTopLoader />
        {children}
      </AuthProvider>
      <Footer />
      <Toaster />
      </body>
    </html>
  )
}
