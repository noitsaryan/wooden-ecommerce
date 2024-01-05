'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

function PasswordChange() {
    const [fields, setFields] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    })
    const { toast } = useToast()
    const { data: session } = useSession()
    const { old_password, new_password, confirm_new_password } = fields;
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFields((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(old_password)
    }

    const Submit = async () => {
        try {
            if (new_password === confirm_new_password) {
                const password = await axios.post('/api/new-password', {
                    email: session?.user?.email,
                    existing_password: old_password,
                    new_password: confirm_new_password
                })
                if(password.data.res === "Password did not matched!"){
                    toast({
                        title: 'Old password did not matched'
                    })
                }
                console.log(password)
            } else {
                toast({
                    title: 'Password Mismatched',
                    description: 'New password and confirm new password not matched'
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <h1 className='text-2xl font-semibold'>Password Change</h1>
            <div className='max-w-md space-y-3 py-4'>
                <Input onChange={handleChange} name="old_password" placeholder='Enter Old Password' />
                <Input onChange={handleChange} name="new_password" placeholder='Enter New Password' />
                <Input onChange={handleChange} name="confirm_new_password" placeholder='Again Enter New Password' />
                <Button className='bg-Primary text-white rounded-sm font-semibold' onClick={Submit}> Change </Button>
            </div>
        </div>
    )
}

export default PasswordChange