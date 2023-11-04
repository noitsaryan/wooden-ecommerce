'use client'
import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import {Button} from "@nextui-org/react";

function ResetForm() {

    const variants = ["flat", "bordered", "underlined", "faded"];
    const [isVisible, setIsVisible] = React.useState(false);
    const [confirmIsVisible, setConfirmIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setConfirmIsVisible(!confirmIsVisible);

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
          <h2 className="text-2xl text-black font-semibold">Reset Password!</h2>
          <p className="text-xs text-Border">We received your reset password request Please enter your new password!</p>
        </div>

        <Input
          classNames={inputStyle}
          label="Password"
          variant={variants}
          endContent={
            <button
              className="focus:outline-none flex items-center justify-center h-full"
              type="button"
              onClick={toggleVisibility}
              onChange={(e) => setPassword(e.target.value)}   
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

        {/*Input  For Password Confirmation  */}
                <Input
          classNames={inputStyle}
          label="Confirm Password"
          variant={variants}
          endContent={
            <button
              className="focus:outline-none flex items-center justify-center h-full"
              type="button"
              onClick={toggleConfirmVisibility}
              onChange={(e) => setPassword(e.target.value)}   
            >
              {confirmIsVisible ? (
                <RiEyeLine/>
              ) : (
                <RiEyeOffLine/>
              )}
            </button>
          }
          type={confirmIsVisible ? "text" : "password"}
        />

   <Button type='submit' className="bg-Primary  w-full outline-none rounded text-white text-lg">
    Confirm
  </Button>

      </section>
       
    )
}

export default ResetForm