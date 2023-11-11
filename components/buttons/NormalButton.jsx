'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

function NormalButton({name, link}) {
    const router = useRouter()
  return (
    <Button className="mx-auto bg-Primary" onClick={() => router.push(link)}>
        {name}
    </Button>
  )
}

export default NormalButton