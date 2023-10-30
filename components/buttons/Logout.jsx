'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
    return (
        <button onClick={signOut}>Log Out</button>
    )
}

export default Logout