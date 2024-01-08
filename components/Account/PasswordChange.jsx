'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';

function PasswordChange() {

    const { toast } = useToast()

    const [fields, setFields] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const { old_password, new_password, confirm_new_password } = fields;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFields((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const Submit = async () => {
        try {
            if (new_password === confirm_new_password) {
                axios.get("/api/get-current-user").then((res) => {
                    if (!res.data.success) {
                        toast({
                            title: res.data.message
                        })
                        return;
                    }
                    axios.post('/api/new-password', {
                        email: res.data.data.email,
                        existing_password: old_password,
                        new_password: confirm_new_password
                    }).then((e) => {
                        if (!e.data.res.success) {
                            toast({
                                title: 'Password did not matched'
                            })
                            return;
                        }
                        toast({
                            title: 'Password changed successfully'
                        })
                    })
                })
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