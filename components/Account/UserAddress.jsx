"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const UserAddress = () => {
  const [response, setResponse] = useState()
  const [billing, setBilling] = useState('')
  const { data: session } = useSession()
  const [fields, setFields] = useState({
    street_name: "",
    flat_no: "",
    landmark: "",
    pincode: "",
  });
  const {street_name, flat_no, landmark, pincode} = fields

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: false
    })
    setBilling(res.data.res?.address?.billing_address)
    setResponse(res.data.res)
  }

  const updateUser = async () => {
    const address = `Street: ${street_name}, Flat No: ${flat_no}, Landmark: ${landmark}, Pin Code: ${pincode}`
    const updateAddress = await axios.post('/api/update-user', {
      email: session?.user?.email,
      type: 'address',
      data: {billing_address: billing, shipping_address: address}
    })
    console.log(updateAddress)
  }

  useEffect(() => {
    fetchUser()
  }, [session])

  if (!response) {
    return <p> No Data to display </p>
  }

  return (
    <>
      <div className="space-y-5">
        <Input
          type="text"
          variant="bordered"
          label="Current Shipping Address:"
          isReadOnly
          placeholder={response?.address?.shipping_address}
        />
        <hr />
        <Dialog>
          <DialogTrigger asChild><Button className="bg-Primary text-white"> Edit </Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
              <DialogDescription asChild>
                <>
                  <h3>Update Address</h3>
                  <Input
                    type="text"
                    variant="bordered"
                    label="Street Name"
                    name="street_name"
                    onChange={handleChange}
                    isRequired
                    value={fields.street_name}
                    placeholder="Enter Street Name"
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Building Name / Flat No"
                    name="flat_no"
                    onChange={handleChange}
                    isRequired
                    value={fields.flat_no}
                    placeholder="Enter Bldg Name / Flat No"
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Landmark"
                    name="landmark"
                    onChange={handleChange}
                    isRequired
                    value={fields.landmark}
                    placeholder="Enter Landmark"
                  />
                  <Input
                    type="number"
                    variant="bordered"
                    label="Pincode"
                    name="pincode"
                    onChange={handleChange}
                    isRequired
                    value={fields.pincode}
                    placeholder="Enter Picode"
                  />
                  <Button
                    className="bg-Primary text-white"
                    size="md"
                    variant="solid"
                    type="submit"
                    onClick={updateUser}
                  >
                    Update
                  </Button>
                </>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
    </>
  );
};

export default UserAddress;
