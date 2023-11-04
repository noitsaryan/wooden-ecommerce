"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import {Button} from "@nextui-org/react";
const SignupForm = () => {
    const variants = ["flat", "bordered", "underlined", "faded"];
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
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
      <h2 className="text-2xl text-black font-semibold">Register</h2>
      <p className="text-xs text-Border">Create an account then continue to checkout</p>
    </div>

    <div className="flex gap-1 md:flex-row flex-col">
    <Input
      classNames={...inputStyle}
      type="text"
      variant={variants}
      label="First Name"
    />
     <Input
      classNames={...inputStyle}
      type="text"
      variant={variants}
      label="Last Name"
    />
    </div>
        <Input
      classNames={...inputStyle}
      type="email"
      variant={variants}
      label="Email"
    />
    <Input
      classNames={inputStyle}
      label="Password"
      variant={variants}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <RiEyeLine/>
          ) : (
            <RiEyeOffLine/>
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />

<Button className="bg-Primary  w-full outline-none rounded text-white text-lg">
Register
</Button>

<h3 className="text-Border text-center text-xs">OR</h3>
<Button color="primary" variant="bordered" className=" border-Primary  border text-Primary  w-full outline-none rounded text-lg">
Log In
</Button>
  </section>
  )
}

export default SignupForm