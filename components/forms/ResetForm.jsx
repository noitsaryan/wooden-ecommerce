'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import axios from 'axios';

function ResetForm() {
  const [mPassword, setPassword] = useState({
    new_pass: '',
    cnf_pass: ''
  })
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const [confirmIsVisible, setConfirmIsVisible] = React.useState(false);
  const params = useSearchParams()
  const token_id = params.get('token_id')
  const user = params.get('user')
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setConfirmIsVisible(!confirmIsVisible);

  const {new_pass, cnf_pass} = mPassword 

  const handleInput = (e) => {
    const {name, value} = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value
    }))
  }

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

  const changePassword = async () => {
    try {
        if(new_pass !== cnf_pass){
          toast({
            title: 'Both Password Did Not Matched!'
          })
          return;
        }
        const res = await axios.post('/api/forget-reset', {
          email: user,
          token: token_id,
          password: new_pass
        })
        if(res.data.res._id) {
          toast({
            title: "Successfully Changed Password"
          })
          return;
        }
      } catch (error) {
      console.log(error.message)
    }
  }
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
        onChange={handleInput}
        name="new_pass"
        value={new_pass}
        endContent={
          <button
            className="focus:outline-none flex items-center justify-center h-full"
            type="button"
            onClick={toggleVisibility}
         
          >
            {isVisible ? (
              <RiEyeLine />
            ) : (
              <RiEyeOffLine />
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
        onChange={handleInput}
        name="cnf_pass"
        value={cnf_pass}
        endContent={
          <button
            className="focus:outline-none flex items-center justify-center h-full"
            type="button"
            onClick={toggleConfirmVisibility}
           
          >
            {confirmIsVisible ? (
              <RiEyeLine />
            ) : (
              <RiEyeOffLine />
            )}
          </button>
        }
        type={confirmIsVisible ? "text" : "password"}
      />

      <Button type='submit' onClick={changePassword} className="bg-Primary  w-full outline-none rounded text-white text-lg">
        Confirm
      </Button>

    </section>

  )
}

export default ResetForm