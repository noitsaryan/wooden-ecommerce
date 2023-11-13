'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast';

const PinCode = () => {
  const [pinCode, setpinCode] = useState("Pin Code");
  const [pinInput, setPinInput] = useState()
  const {toast} = useToast()
  const fetchPin = async (e) => {
    const res = await axios.get(
      `https://api.postalpincode.in/pincode/${pinInput}`
    );


    setPinInput("");
    setpinCode(
      `${res.data?.[0].PostOffice?.[0].Name}, ${res.data?.[0].PostOffice?.[0].Block}`
    );
    if (
      res.data?.[0].PostOffice?.[0].Block == "Thane" ||
      res.data?.[0].PostOffice?.[0].Block == "Mumbai" ||
      res.data?.[0].PostOffice?.[0].Block == "Kalyan" ||
      res.data?.[0].PostOffice?.[0].Block == "Palghar" ||
      res.data?.[0].PostOffice?.[0].Block == "Navi Mumbai" ||
      res.data?.[0].PostOffice?.[0].Block == "Vasai"
    ) {
      toast({
        title: "Delivery Available"
      });
    } else {
      toast({
        title: "Delivery Not Available!" 
      });
    }
  };

  return (
    <div className="max-w-xs flex items-center justify-between px-4 py-1 m-4 ring-1 ring-gray-200 rounded-md  ">
      <input
        type="number"
        className="w-full outline-none"
        value={
          pinInput > 999999 ? pinInput.toString().slice(0, 5) : pinInput
        }
        onChange={(e) => setPinInput(e.target.value)}
        placeholder={pinCode}
      />
      <button
          onClick={fetchPin}
        className="text-Primary  p-2  rounded-lg"
      >
        Apply
      </button>
    </div>
  )
}

export default PinCode