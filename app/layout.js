import { AuthProvider } from '@/providers'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kasho',
  description: 'Decor your space with us! Kasho is an online ecommerce furniture store.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <AuthProvider> {children}</AuthProvider></body>
    </html>
  )
}
