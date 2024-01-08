'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
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
  const { toast } = useToast()
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    phone: 0,
    email: ''
  });

  const fetchUser = () => {
    axios.get("/api/get-current-user").then((res) => {
      if (!res.data.success) {
        toast({
          title: res.data.message
        })
        return;
      }
      setFields({
        first_name: res.data.data.name?.first_name,
        last_name: res.data.data.name?.last_name,
        phone: res.data.data?.phone_no,
        email: res.data.data.email
      })
    })

  }

  const { first_name,
    last_name,
    phone } = fields;

  const updateUser = async () => {
    try {
      axios.post('/api/update-user', {
        email: fields.email,
        type: 'name',
        data: { first_name, last_name }
      }).then((res) => {
        if (res.data.response.success) {
          toast({
            title: 'Changes saved successfully'
          })
          return;
        }
      })
      axios.post('/api/update-user', {
        email: fields.email,
        type: 'phone',
        data: phone
      }).then((res) => {
        if (res.data.response.success) {
          toast({
            title: 'Changes saved successfully'
          })
          return;
        }
      })

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
  }, [])

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
          placeholder={fields.first_name}
          disabled
        />
        <Input
          type="text"
          variant="bordered"
          name="last_name"
          label="Last name"
          isRequired
          placeholder={fields.last_name}
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
        placeholder={fields.email}
        onChange={handleChange}
      />
      <Input
        type="number"
        variant="bordered"
        name="phone"
        label="Phone Number"
        isRequired
        placeholder={fields.phone}
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
