'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import { Mail } from 'lucide-react'
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const { toast } = useToast()
  const adminLogin = async () => {
    try {
      const response = await axios.post('/api/admin-login', {
        email, password
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className='space-y-8 py-24 px-4'>
      <div>
        <h1 className='text-center text-2xl'> Ashofy </h1>
        <p className='text-center'> Admin Login </p>
      </div>
      <div className='mx-auto max-w-sm '>
        <Label className='font-medium text-sm'>Email</Label>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
        <br />
        <Label className='font-medium text-sm'>Password</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <br />
        <Button className="w-full" onClick={async () => {
          const data = await adminLogin();
          if (data.data === true) {
            toast({
              title: 'Email Sent'
            })
          } else if (data.data === 'Email does not exists') {
            toast({
              title: 'Incorrect Email'
            })
          } else if (data.data === "Password didn't matched") {
            toast({
              title: 'Password mismatch'
            })
          } else if (data.data === "Password didn't matched") {
            toast({
              title: 'Please fill all data'
            })
          }
        }} >
          <Mail className='mr-2 h-4 w-4' /> Login with Email
        </Button>
      </div>
    </main>
  )
}

export default Page