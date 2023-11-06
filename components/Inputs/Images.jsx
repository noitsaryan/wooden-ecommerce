'use client'
import {getPreview, uploadImage} from '@/utils/lib/appwrite'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Images() {
    const [images, setImages] = useState()
    const [URL, setURL] = useState(String)
    const array = images ? Array.from(images): []
    const upload = async () => {
        let imageArray = [];
        if(!images){
            return;
        }
        for(let i =0; i < array.length; i++){
            const fileUploaded = await uploadImage(images[i])    
            if(!fileUploaded) return;
            imageArray.push(fileUploaded.$id)
        }
    }
    return (
        <>
            <input type="file" multiple accept='image/*' onChange={(e) => {
                setImages(e.target.files);
            }
            } />
            <button onClick={upload} type='button'>
                Upload
            </button>
        </>
    )
}

export default Images