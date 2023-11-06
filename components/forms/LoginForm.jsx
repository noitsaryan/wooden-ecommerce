'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from "@nextui-org/react";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState(String)
  const [password, setPassword] = useState(String)
  const router = useRouter(null);

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

  async function login() {
    try {
      const res = await signIn('credentials', {
        email, password, redirect: false
      })

      if (res.error) {
        throw new Error(res.error)
      }

      if (res.ok) {
        return router.replace('/dashboard')
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (

    <section className="flex-1 h-full space-y-4 p-8 ">
      <div className="flex flex-col ">
        <h2 className="text-2xl text-black font-semibold">Welcome Back!</h2>
        <p className="text-xs text-Border">Login to your Account</p>
      </div>

      <Input
        classNames={...inputStyle}
        type="email"
        variant={variants}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        classNames={inputStyle}
        label="Password"
        variant={variants}
        onChange={(e) => setPassword(e.target.value)}
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
      <p className="text-Border text-xs hover:text-Primary hover:cursor-pointer hover:font-semibold transition-all">Forget password</p>

      <Button type='submit' onClick={login} className="bg-Primary  w-full outline-none rounded text-white text-lg">
        Log In
      </Button>

      <h3 className="text-Border text-center text-xs">OR</h3>
      <Link href="/signup">
        <Button color="primary" variant="bordered" className=" border-Primary  border text-Primary  w-full outline-none rounded text-lg">
          Register
        </Button>
      </Link>
    </section>

  )
}

export default LoginForm