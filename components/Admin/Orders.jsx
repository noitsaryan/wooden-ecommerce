'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"
import { useToast } from '../ui/use-toast'

function Orders() {
  const [orders, setOrder] = useState(Array)
  const [isOpen, setIsOpen] = useState(false)
  const [stage, setStage] = useState(String)
  const [message, setMessage] = useState(String)
  const { toast } = useToast()
  const getOrders = async () => {
    try {
      const res = await axios.get('/api/get-orders-user')
      const array = [];
      const orderLists = res.data.data.map((e) => {
        const orderList = e.order_lists;
        const user = e.user_id
        array.push({
          ...orderList,
          ...user
        })
      })
      console.log(array)
      setOrder(array)
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateStatus = async (id) => {
    try {
      const res = await axios.post('/api/update-order-status', {
        order_id: id,
        stage,
        message
      })
      if (res.data.res) {
        toast({
          title: "Status Updated Successfully"
        })
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <main className='max-w-6xl mx-auto '>
      <h1 className='text-2xl text-center my-4 font-medium'> Order Management </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Payment Id</TableHead>
            <TableHead className="text-right">Current Status</TableHead>
            <TableHead className="text-right">View/Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            orders && orders.map((e, i) => {
              return <TableRow key={i}>
                <TableCell className="font-medium">{e?.[0]._id}</TableCell>
                <TableCell className="uppercase">{e?.[0].product_sku}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e?.phone_no}</TableCell>
                <TableCell className="text-right">{e?.[0].payments.payment_id}</TableCell>
                <TableCell className="text-right capitalize">{e?.[0].status.state[e?.[0].status.state.length - 1]?.stage
                }</TableCell>
                <TableCell className="text-right">

                  <Dialog>
                    <DialogTrigger> <Button className="bg-gray-500"> More </Button> </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription className={`max-h-[40vh] ${isOpen ? 'overflow-y-scroll' : ''} `}>
                          <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="w-full space-y-2"
                          >
                            <div className="flex items-center justify-between space-x-4 px-4">
                              <h4 className="text-sm font-semibold">
                                Complete Order Details
                              </h4>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                  <ChevronsUpDown className="h-4 w-4" />
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <div className="rounded-md border px-4 py-3 font-mono text-sm">
                              Name : {e?.name.first_name}
                            </div>
                            <CollapsibleContent className="space-y-2">
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                Email : {e?.email}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                Phone : {e?.phone_no}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                Address <br />
                                Shipping Address: {e.address?.shipping_address} <br />
                                Billing Address: {e.address?.billing_address}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                GST : {e?.gst_no} <br />
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm uppercase">
                                SKU : {e?.[0].product_sku}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                Quantity : {e?.[0].quantity}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                Amount Paid : ₹ {e?.[0].totalPrice}
                              </div>
                              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                                <p>
                                  Payments <br />
                                  Payment Id: {e?.[0].payments.payment_id} <br />
                                  Signature: {e?.[0].payments.signature}
                                </p>
                              </div>
                              {
                                e?.[0].status.state.map((e, i) => {
                                  return <div key={i} className="rounded-md border px-4 py-3 font-mono text-sm">
                                    {i} <br />
                                    Stage: {e.stage} <br />
                                    Message: {e.message}
                                  </div>
                                })
                              }
                            </CollapsibleContent>
                          </Collapsible>
                          <div className='p-4'>
                            <h4 className="text-sm font-semibold">
                              Update Status
                            </h4>
                            <div className='space-y-4 py-2'>
                              <Input
                                placeholder="Stage"
                                onChange={(e) => setStage(e.target.value)}
                              />
                              <Input
                                placeholder="Message"
                                onChange={(e) => setMessage(e.target.value)}
                              />
                              <Button onClick={() => updateStatus(e?.[0]._id)} >
                                Update Status
                              </Button>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                </TableCell>
              </TableRow>
            })
          }
        </TableBody>
      </Table>

    </main>
  )
}

export default Orders