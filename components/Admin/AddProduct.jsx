'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, Package } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'

function AddProduct() {
  const [color, setColor] = useState(String)
  const [colorArray, setColorArray] = useState([]);
  const colorInput = useRef()
  const addColor = () => {
    const newColor = colorInput.current.value;
    if (newColor) {
      setColorArray((prevColorArray) => [...prevColorArray, newColor]);
      colorInput.current.value = '';
    }
  };
  useEffect(() => {
    console.log(colorArray)
  }, [colorArray])
  return (
    <main>
      <div className='flex items-center justify-center  '>
        <Package className='mx-2' />
        <h1 className='text-center text-2xl font-medium'> Add New Product </h1>
      </div>
      <div className='max-w-md mx-auto'  >
        <div  >
          <h1 className='font-semibold text-lg my-2'  >Basics</h1>
          <span>
            <Label> Title </Label>
            <Input placeholder="Enter Title" />
          </span>
          <span>
            <Label> Price </Label>
            <Input placeholder="Enter Price" />
          </span>
          <span>
            <Label> Sku </Label>
            <Input placeholder="Enter SKU - Convention: WH{Category}{ProductNumber} " />
          </span>
          <span>
            <Label> Description </Label>
            <Input placeholder="Enter Description" />
          </span>
        </div>
        <div>
          <h1 className='font-semibold text-lg my-4'  >Specifications</h1>
          <div>
            <span>
              <Label> Color </Label>
              <Input placeholder="Enter Color" onChange={color => setColor(color.target.value)} ref={colorInput} />
              <Button variant="outline" size="icon" className="my-1" onClick={addColor}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                {
                  colorArray && colorArray.map((e, i) => {
                    return <Input
                      placeholder={e}
                      disabled
                      key={i}
                      className="my-1"
                    />
                  })
                }
              </div>
            </span>
            <Label className='my-2'> Custom Specifications </Label>
            {/* <span>
              <Label> Color </Label>
              <Input placeholder="Enter Color"  onChange={color => setColor(color.target.value)} ref={colorInput} />
              <Button variant="outline" size="icon" className="my-1" onClick={addColor}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                {
                  colorArray && colorArray.map((e, i) => {
                    return <Input
                      placeholder={e}
                      key={i}
                      className="my-1"
                    />
                  })
                }
              </div>
            </span> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddProduct