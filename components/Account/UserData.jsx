'use client'
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

const UserData = () => {
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields); 
  };

  const isFormValid = Object.values(fields).every((value) => value.trim() !== '');

  return (
    <div className="space-y-5">
      <h3>Your Details</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <span className="w-full grid grid-cols-2 gap-2">
          <Input
            type="text"
            variant="bordered"
            name="first_name"
            label="First name"
            isRequired
            placeholder="Enter First Name"
            value={fields.first_name}
            onChange={handleChange}
          />
          <Input
            type="text"
            variant="bordered"
            name="last_name"
            label="Last name"
            isRequired
            placeholder="Enter Last Name"
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
          placeholder="Enter Email Address"
          value={fields.email}
          onChange={handleChange}
        />
        <Input
          type="number"
          variant="bordered"
          name="phone"
          label="Phone Number"
          isRequired
          placeholder="Enter Phone Number"
          value={fields.phone}
          onChange={handleChange}
        />
        <Button
          className="bg-Primary"
          type="submit"
          size="md"
          variant="solid"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserData;
