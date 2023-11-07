'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function NormalButton({name, link}) {
    const router = useRouter()
  return (
    <Button className="mx-auto" onClick={() => router.push(link)}>
        {name}
    </Button>
  )
}

export default NormalButton