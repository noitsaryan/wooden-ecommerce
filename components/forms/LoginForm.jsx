'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginForm() {
    const [email, setEmail] = useState(String)
    const [password, setPassword] = useState(String)
    const router = useRouter(null)
    async function login() {
        try {
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res.error) {
                throw new Error(res.error)
            }

            if (res.ok) {
                return router.replace('/dashboard')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={login}> Login </button>
        </div>
    )
}

export default LoginForm