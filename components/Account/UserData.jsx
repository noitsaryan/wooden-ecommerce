'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { updateUser } from '@/utils/lib/users';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';

const UserData = () => {
  const [response, setResponse] = useState()
  const { data: session } = useSession()
  const {toast} = useToast()
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });


  const fetchUser = async () => {
    const res = await axios.post('/api/get-user-by-id', {
      user: session?.user?.email,
      order: false
    })
    setResponse(res.data.res)
  }

  const { first_name,
    last_name,
    phone, } = fields;

  const update = async () => {
    const number = parseInt(phone)
    const name = {
      first_name, last_name
    }
    if (!first_name || !last_name) {
      return;
    } else {
      const user = await updateUser(session?.user?.image, name, "name")
      if(user) {
        toast({
          title: 'Successfully Updated'
        })
      }
    }
    if (!number) {
      return;
    } else {
      const user = await updateUser(session?.user?.image, number, "phone")
      if(user) {
        toast({
          title: 'Successfully Updated'
        })
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await update();
    window.location.reload()
    
    console.log(fields);
  };


  useEffect(() => {
    fetchUser()
  },[session])

  if(!response) {
    return <p> No Data to display </p>
  }

  return (
    <div className="space-y-5">
      <h3>Personal Details</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <span className="w-full grid grid-cols-2 gap-2">
          <Input
            type="text"
            variant="bordered"
            name="first_name"
            label="First name"
            isRequired
            placeholder={response ? response.name.first_name : ''}
            value={fields.first_name}
            onChange={handleChange}
          />
          <Input
            type="text"
            variant="bordered"
            name="last_name"
            label="Last name"
            isRequired
            placeholder={response ? response.name.last_name : ''}
            value={fields.last_name}
            onChange={handleChange}
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
          value={fields.phone}
          onChange={handleChange}
        />
        <Button
          className="bg-Primary"
          type="submit"
          size="md"
          variant="solid"
        // disabled={!isFormValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserData;
