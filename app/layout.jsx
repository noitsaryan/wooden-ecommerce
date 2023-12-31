import { AuthProvider } from '@/providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/HeaderLayout/Header'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/HeaderLayout/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ashofy',
  description: 'Decor your space with us! Ashofy is an online ecommerce furniture store.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <NextTopLoader color='#ac342c' />
          {children}
        </AuthProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
