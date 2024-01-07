'use client'
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState } from 'react'

function page() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        complaint: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    async function handleClick() {
        const response = await axios.post("/api/send-complain", {
            email: formData.email,
            phone: formData.phone,
            complain: formData.complaint
        })
        if (response.data.success) {
            toast({
                title: 'Complain sent successfully'
            })
        }
    }
    return (
        <main className='p-8'>
            <h1 className="text-4xl font-bold mb-6">Complaints</h1>
            <div className='flex flex-col gap-2'>
                <input type="email" placeholder='Enter Email' name='email' onChange={handleInputChange} className='border p-2 rounded-xl' />
                <input type="number" placeholder='Enter Phone' name='phone' onChange={handleInputChange} className='border p-2 rounded-xl' />
                <textarea placeholder='Enter Query or Complaint' name='complaint' onChange={handleInputChange} className='border p-2 rounded-xl' />
                <button onClick={handleClick} className='bg-red-800 text-white py-2 rounded-xl'>
                    Submit
                </button>
            </div>
        </main>
    )
}

export default page