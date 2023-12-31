"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "../ui/use-toast";

const UserAddress = () => {
  const [billing, setBilling] = useState('')
  const [email, setEmail] = useState('')
  const [fields, setFields] = useState({
    street_name: "",
    flat_no: "",
    landmark: "",
    pincode: "",
  });
  const { street_name, flat_no, landmark, pincode } = fields
  const { toast } = useToast()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const fetchUser = () => {
    axios.get("/api/get-current-user").then((res) => {
      if (!res.data.success) {
        toast({
          title: res.data.message
        })
        return;
      }
      setBilling(res.data.data.address?.shipping_address)
      setEmail(res.data.data.email)
    })
  }

  const updateUser = async () => {
    const address = `Street: ${street_name}, Flat No: ${flat_no}, Landmark: ${landmark}, Pin Code: ${pincode}`
    const updateAddress = await axios.post('/api/update-user', {
      email: email,
      type: 'address',
      data: { billing_address: billing, shipping_address: address }
    })
    if (updateAddress.data.response.success) {
      toast({
        title: 'Address Updated Successfully'
      })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <div className="space-y-5">
        <Input
          type="text"
          variant="bordered"
          label="Current Shipping Address:"
          isReadOnly
          placeholder={billing}
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