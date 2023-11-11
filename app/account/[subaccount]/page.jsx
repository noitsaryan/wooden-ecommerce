'use client'
import Carts from '@/components/Account/Carts'
import UserAddress from '@/components/Account/UserAddress'
import UserData from '@/components/Account/UserData'
import MyOrders from '@/components/Account/MyOrders'
import React from 'react'

const page = ({params}) => {
    const {subaccount}=params
  return (
    <>
    {
        subaccount==="orders" ? <MyOrders/>:
        subaccount==="carts" ? <Carts/>:
        subaccount==="userdata" ? <UserData/>:
        subaccount==="address" ? <UserAddress/>:
        null
    }
    </>
  )
}

export default page