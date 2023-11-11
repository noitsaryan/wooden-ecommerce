"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const ForgetForm = () => {
  const [email, setEmail] = useState(String)
  const variants = ["flat", "bordered", "underlined", "faded"];
  const inputStyle = {
    erWrapper: "bg-white  pb-3",
    inputWrapper: [
      "bg-white",
      "rounded",
      "text-black",
      "shadow-none",
      "border",
      "border-Border w-full h-12 p-1 px-3 ",
    ],
  };

  const {toast} = useToast()

  const verify = async () => {
    const res = await axios.post('/api/forget-auth', {
      email
    })

    if(res.data === "Email does not exists") {
      toast({
        title: 'Email does not exists'
      })
    }

    if(res.data === "Mail Sent") {
      toast({
        title: 'Mail Sent Successfully'
      })
    }
  }



  return (
    <section className="flex-1 h-full space-y-4 p-8 ">
      <div className="flex flex-col ">
        <h2 className="text-2xl text-black font-semibold">Forgot Password?</h2>
        <p className="text-xs text-Border">Enter your email id to reset your password.</p>
      </div>

      <Input
        className={...inputStyle}
        type="email"
        variant={variants}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={verify} disabled={ !email < 0 ? true : false }  className="bg-Primary  w-full outline-none rounded text-white text-lg">
        Verify
      </Button>
    </section>
  )
}

export default ForgetForm