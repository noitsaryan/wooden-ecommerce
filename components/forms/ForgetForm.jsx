"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const ForgetForm = () => {
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
  return (
    <section className="flex-1 h-full space-y-4 p-8 ">
      <div className="flex flex-col ">
        <h2 className="text-2xl text-black font-semibold">Forgot Password?</h2>
        <p className="text-xs text-Border">Enter your email id to reset your password.</p>
      </div>

      <Input
        classNames={...inputStyle}
        type="email"
        variant={variants}
        label="Email"
      />



      <Button className="bg-Primary  w-full outline-none rounded text-white text-lg">
        Get OTP
      </Button>
    </section>
  )
}

export default ForgetForm