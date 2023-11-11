'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronRight, Package } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '@/components/ui/button'
import Images, { addProductImage } from '../Inputs/Images'
import { createProduct } from '@/utils/lib/products'
import { useToast } from '../ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function AddProduct() {
  const { toast } = useToast()
  const [images, setImages] = useState()
  const [color, setColor] = useState(String)
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [customArray, setCustomArray] = useState([]);
  const [name, setName] = useState(String)
  const [value, setValue] = useState(String)
  const [title, setTitle] = useState(String)
  const [price, setPrice] = useState(Number)
  const [maintenance, setMaintenance] = useState(String)
  const [warranty, setWarranty] = useState(String)
  const [sku, setSKU] = useState(String)
  const [category, setCategory] = useState('residence')
  const [subCategory, setSubCategory] = useState(String)
  const [description, setDescription] = useState(String)
  const [sizeName, setSizeName] = useState(String)
  const [sizePrice, setSizePrice] = useState(String)
  const [measurement, setMeasurement] = useState(String)
  const colorInput = useRef()
  const nameInput = useRef()
  const measurementInput = useRef()
  const priceInput = useRef()

  const addColor = (type) => {
    if (type === 'color') {
      const newColor = colorInput.current.value;
      if (newColor) {
        setColorArray((prevColorArray) => [...prevColorArray, newColor]);
        colorInput.current.value = '';
      }
    } else if (type === 'size') {
      const name = nameInput.current.value;
      const measure = measurementInput.current.value;
      const price = priceInput.current.value;
      const object = {
        name, measure, price
      }
      if (object) {
        setSizeArray((prev) => [...prev, object]);
        nameInput.current.value = '';
        measurementInput.current.value = '';
        priceInput.current.value = '';
      }
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
      if (!images) return;
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
        sizeArray,
        warranty,
        maintenance
      )
      if (promise.data.response) {
        toast({
          title: 'Successfully Added Product'
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <main>
      <div className='flex items-center justify-center  '>
        <Package className='mx-2' />
        <h1 className='text-center text-2xl font-medium'> Add New Product </h1>
      </div>
      <div className=' w-full grid grid-cols-3 gap-3 px-4'  >
        <div className='flex flex-col gap-1' >
          <h1 className='font-semibold text-lg my-2 '  >Basics</h1>
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
            <Label> Warranty </Label>
            <Input placeholder="Enter Description" onChange={(e) => setWarranty(e.target.value)} />
          </span>
          <span>
            <Label> Maintenance </Label>
            <Input placeholder="Enter Description" onChange={(e) => setMaintenance(e.target.value)} />
          </span>
          <span>
            <Label> Category </Label>
            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residence" >Residence</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="lights">Lights</SelectItem>
              </SelectContent>
            </Select>

          </span>
          <span>
            <Label> Sub Category</Label>
            <Input placeholder="Enter Description" onChange={(e) => setSubCategory(e.target.value)} />
          </span>
        </div>
        <div>
          <h1 className='font-semibold text-lg my-4'  >Specifications</h1>
          <div>
            <span className='space-y-2'>
              <Label> Color </Label>
              <Input placeholder="Enter Color" onChange={e => setColor(e.target.value)} ref={colorInput} />
              <Button variant="outline" size="icon" className="my-1" onClick={() => addColor('color')}>
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
            <span className='space-y-2'>
              <Label> Size </Label>
              <Input placeholder="Enter Name" onChange={e => setSizeName(e.target.value)} ref={nameInput} />
              <Input placeholder="Enter Measurement" onChange={e => setMeasurement(e.target.value)} ref={measurementInput} />
              <Input placeholder="Enter Price" onChange={e => setSizePrice(e.target.value)} ref={priceInput} />
              <Button variant="outline" size="icon" className="my-1" onClick={() => addColor('size')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div>
                {
                  sizeArray && sizeArray.map((e, i) => {
                    return <div className='space-y-2' key={i}>
                      <Input
                        value={e.name}
                        disabled
                        
                        className="my-1"
                      />
                      <Input
                        value={e.measure}
                        disabled
                        key={i}
                        className="my-1"
                      />
                      <Input
                        value={e.price}
                        disabled
                        key={i}
                        className="my-1"
                      />
                    </div>
                  })
                }
              </div>
            </span>
            <Label className='my-2'> Custom Specifications </Label>
            <span className='space-y-2'>
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
                      <div className='flex items-center' key={i}>
                        <Input
                          placeholder={e.name}
                          
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