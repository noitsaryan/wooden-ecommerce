'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function page() {
  const { data: session } = useSession()
  return (
    <div>

      <h1> Welcome </h1>
      <p> First Name: {session?.user?.name.first_name}  </p>
      <p> Last Name: {session?.user?.name.last_name}  </p>
      <p>Email: {session?.user?.email}</p>

    </div>
  )
}

export default page