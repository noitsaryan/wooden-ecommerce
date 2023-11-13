'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const UserData = () => {
  const [response, setResponse] = useState()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    phone: 0,
  });


  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: false
    })
    setFields({
      first_name: res.data.res?.name.first_name,
      last_name: res.data.res?.name.last_name,
      phone: res.data.res?.phone_no
    })
    setResponse(res.data.res)
  }

  const { first_name,
    last_name,
    phone } = fields;

  const updateUser = async () => {
    try {
      const name = await axios.post('/api/update-user', {
        email: session?.user?.email,
        type: 'name',
        data: { first_name, last_name }
      })
      const phoneNo = await axios.post('/api/update-user', {
        email: session?.user?.email,
        type: 'phone',
        data: phone
      })

      if(name && phoneNo) {
        toast({
          title: 'Changes Saved Successfully'
        })
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUser()
  }, [session])

  if (!response) {
    return <p> No Data to display </p>
  }

  return (
    <div className="space-y-5">
      <h3>Personal Details</h3>
      <span className="w-full grid grid-cols-2 gap-2">
        <Input
          type="text"
          variant="bordered"
          name="first_name"
          label="First name"
          isRequired
          placeholder={response ? response.name.first_name : ''}
          disabled
        />
        <Input
          type="text"
          variant="bordered"
          name="last_name"
          label="Last name"
          isRequired
          placeholder={response ? response.name.last_name : ''}
          disabled
        />
      </span>
      <Input
        type="text"
        variant="bordered"
        name="email"
        label="Email"
        isRequired
        disabled
        placeholder={response ? response.email : ''}
        value={fields.email}
        onChange={handleChange}
      />
      <Input
        type="number"
        variant="bordered"
        name="phone"
        label="Phone Number"
        isRequired
        placeholder={response.phone_no}
        disabled
      />
      <Dialog>
        <DialogTrigger asChild><Button className='bg-Primary text-white'>Edit</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Personal Details</DialogTitle>
            <DialogDescription asChild>
              <div className=' flex flex-col gap-3 py-2'>
                <Input
                  type="text"
                  variant="bordered"
                  name="first_name"
                  label="First name"
                  isRequired
                  value={fields.first_name}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  variant="bordered"
                  name="last_name"
                  label="Last name"
                  isRequired
                  value={fields.last_name}
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  variant="bordered"
                  name="phone"
                  label="Phone Number"
                  isRequired
                  value={fields.phone}
                  onChange={handleChange}
                />
                <Button onClick={updateUser} className='bg-Primary text-white'>Update</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UserData;
