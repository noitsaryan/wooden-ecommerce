"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { updateUser } from "@/utils/lib/users";

const UserAddress = () => {
  const [response, setResponse] = useState()
  const { data: session } = useSession()
  const [fields, setFields] = useState({
    street_name: "",
    flat_no: "",
    landmark: "",
    pincode: "",
  });

  const { street_name,
    flat_no,
    landmark,
    pincode,
  } = fields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await update()
    console.log(fields);
  };

  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: false
    })
    setResponse(res.data.res)
  }

  const update = async () => {
    const shipping_address = `Street:${street_name}, Flat:${flat_no}, Landmark:${landmark}, Pin Code:${pincode}`
    const address = {
      shipping_address,
      billing_address: response.address.billing_address
    }
    if (!street_name ||
      !flat_no ||
      !landmark ||
      !pincode) {
      return;
    } else {
      const res = await updateUser(session?.user?.email, address, "address")
    }
    window.location.reload()
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
        <h3>Update Address</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
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
            className="bg-Primary"
            size="md"
            variant="solid"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserAddress;
