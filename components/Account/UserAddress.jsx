"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

const UserAddress = () => {
  const [fields, setFields] = useState({
    street_name: "",
    flat_no: "",
    landmark: "",
    pincode: "",
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
  const isFormValid = Object.values(fields).every(
    (value) => value.trim() !== ""
  );

  return (
    <>
      <div className="space-y-5">
        <Input
          type="text"
          variant="bordered"
          label="Current Shipping Address:"
          isReadOnly
          placeholder="No address available"
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
            disabled={!isFormValid}
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserAddress;
