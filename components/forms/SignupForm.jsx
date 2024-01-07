"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignupForm = () => {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: "",
    password: ''
  })
  const route = useRouter()
  const { toast } = useToast()

  const { first_name, last_name, email, password } = user;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
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

  const register = async () => {
    try {
      const name = {
        first_name, last_name
      }
      const res = await axios.post('/api/register', {
        name, email, password
      })

      if (!res.data.success) {
        toast({
          title: res.data.message,
          variant: 'destructive'
        })
        return;
      }

      toast({
        title: 'Successfully Registered'
      })

      route.push('/login')

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="flex-1 h-full space-y-4 p-8 ">
      <div className="flex flex-col ">
        <h2 className="text-2xl text-black font-semibold">Register</h2>
        <p className="text-xs text-Border">Create an account then continue to checkout</p>
      </div>

      <div className="flex gap-1 md:flex-row flex-col">
        <Input
          type="text"
          variant={variants}
          name="first_name"
          value={first_name}
          onChange={handleInput}
          label="First Name"
        />
        <Input
          type="text"
          variant={variants}
          name="last_name"
          value={last_name}
          onChange={handleInput}
          label="Last Name"
        />
      </div>
      <Input
        type="email"
        variant={variants}
        name="email"
        value={email}
        onChange={handleInput}
        label="Email"
      />
      <Input
        label="Password"
        variant={variants}
        name="password"
        value={password}
        onChange={handleInput}
        endContent={
          <button
            className="focus:outline-none"
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

      <Button onClick={register} disabled={!first_name || !last_name || !email || !password ? true : false} className="bg-Primary  w-full outline-none rounded text-white text-lg">
        Register
      </Button>

      <Link href="/login">
        <Button color="primary" variant="bordered" className=" my-2 border-Primary  border text-Primary  w-full outline-none rounded text-lg">
          Log In
        </Button>
      </Link>
    </section>
  )
}

export default SignupForm