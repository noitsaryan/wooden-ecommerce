
import Carts from '@/components/Account/Carts'
import UserAddress from '@/components/Account/UserAddress'
import UserData from '@/components/Account/UserData'
import MyOrders from '@/components/Account/MyOrders'
import React from 'react'
import PasswordChange from '@/components/Account/PasswordChange'

const page = ({ params }) => {
  const subaccount = params.subaccount;
  return (
    <>
      {
        subaccount === "orders" ? <MyOrders /> :
          subaccount === "carts" ? <Carts /> :
            subaccount === "userdata" ? <UserData /> :
              subaccount === "address" ? <UserAddress /> :
                subaccount === "new-password" ? <PasswordChange /> :
                  null
      }
    </>
  )
}

export default page
export const dynamic = 'force-dynamic'