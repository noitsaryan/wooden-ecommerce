'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

function NormalButton({name, link, extraClass}) {
    const router = useRouter()
  return (
    <Button className={`mx-auto bg-Primary rounded ${extraClass} text-white font-light`} onClick={() => router.push(link)}>
        {name}
    </Button>
  )
}

export default NormalButton