'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, Package } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import Images, { addProductImage } from '../Inputs/Images'
import { createProduct } from '@/utils/lib/products'
import {  useToast } from '../ui/use-toast'

function AddProduct() {
  const {toast} = useToast()
  const [images, setImages] = useState()
  const [color, setColor] = useState(String)
  const [colorArray, setColorArray] = useState([]);
  const [customArray, setCustomArray] = useState([]);
  const [name, setName] = useState(String)
  const [value, setValue] = useState(String)
  const [title, setTitle] = useState(String)
  const [price, setPrice] = useState(Number)
  const [sku, setSKU] = useState(String)
  const [category, setCategory] = useState(String)
  const [subCategory, setSubCategory] = useState(String)
  const [description, setDescription] = useState(String)
  const colorInput = useRef()

  const addColor = () => {
    const newColor = colorInput.current.value;
    if (newColor) {
      setColorArray((prevColorArray) => [...prevColorArray, newColor]);
      colorInput.current.value = '';
    }
  };
  const addCustom = (name, value) => {
    const object = {
      name, value
    }
    if (object) {
      setCustomArray((prevColorArray) => [...prevColorArray, object]);
    }
  };

  const uploadProduct = async () => {
    try {
      if(!images) return;
      console.log('From Below',images)
      const imageArray = await addProductImage(images);
      const promise = await createProduct(
        title,
        price,
        sku,
        description,
        customArray,
        colorArray,
        imageArray,
        category,
        subCategory,
      )
      if(promise.data.response){
        toast({
          title: 'Successfully Added Product'
        })
      }
      console.log(promise)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <main>
      <div className='flex items-center justify-center  '>
        <Package className='mx-2' />
        <h1 className='text-center text-2xl font-medium'> Add New Product </h1>
      </div>
      <div className=' w-full grid grid-cols-3 gap-3 px-4'  >
        <div className='' >
          <h1 className='font-semibold text-lg my-2'  >Basics</h1>
          <span>
            <Label> Title </Label>
            <Input placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
          </span>
          <span>
            <Label> Price </Label>
            <Input placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
          </span>
          <span>
            <Label> Sku </Label>
            <Input placeholder="Enter SKU - Convention: WH{Category}{ProductNumber} " onChange={(e) => setSKU(e.target.value)} />
          </span>
          <span>
            <Label> Description </Label>
            <Input placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
          </span>
          <span>
            <Label> Category </Label>
            <Input placeholder="Enter Category" onChange={(e) => setCategory(e.target.value)} />
          </span>
          <span>
            <Label> Sub Category</Label>
            <Input placeholder="Enter Description" onChange={(e) => setSubCategory(e.target.value)} />
          </span>
        </div>
        <div>
          <h1 className='font-semibold text-lg my-4'  >Specifications</h1>
          <div>
            <span>
              <Label> Color </Label>
              <Input placeholder="Enter Color" onChange={e => setColor(e.target.value)} ref={colorInput} />
              <Button variant="outline" size="icon" className="my-1" onClick={() => addColor()}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                {
                  colorArray && colorArray.map((e, i) => {
                    return <Input
                      value={e}
                      disabled
                      key={i}
                      className="my-1"
                    />
                  })
                }
              </div>
            </span>
            <Label className='my-2'> Custom Specifications </Label>
            <span>
              <Label> Name </Label>
              <Input placeholder="Enter Name" onChange={e => setName(e.target.value)} />
              <Label> Value </Label>
              <Input placeholder="Enter Value" onChange={e => setValue(e.target.value)} />
              <Button variant="outline" size="icon" className="my-1" onClick={() => addCustom(name, value)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                {
                  customArray && customArray.map((e, i) => {
                    return <>
                      <div className='flex items-center'>
                        <Input
                          placeholder={e.name}
                          key={i}
                          className="my-1"
                        />
                        <p className='mx-1'>:</p>
                        <Input
                          placeholder={e.value}
                          key={i + 8}
                          className="my-1"
                        />
                      </div>
                    </>
                  })
                }
              </div>
            </span>
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-lg my-2'  >Image Upload</h1>
          <div>
            <Input type="file" multiple className="my-2" accept='image/*' onChange={(e) => {
              setImages(e.target.files);
            }
            }
            />
            <Button onClick={uploadProduct} disabled={!title ||
              !price ||
              !sku ||
              !description ||
              !customArray ||
              !colorArray ||
              !images ||
              !category ||
              !subCategory ? true : false} >
              Upload Product
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddProduct