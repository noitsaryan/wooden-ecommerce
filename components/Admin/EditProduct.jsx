import { FileEdit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { deleteProduct, updateProduct } from '@/utils/lib/products'
import { useToast } from '../ui/use-toast'

function EditProduct() {
  const [product, setProduct] = useState(Array)
  const [title, setTitle] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [sku, setSKU] = useState()
  const [color, setColor] = useState()
  const [name, setName] = useState()
  const [value, setValue] = useState()
  const { toast } = useToast()
  async function getProducts() {
    const res = await fetch('/api/get-products')
    const data = await res.json()
    setProduct(data)
    return data
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <main>
      <div className='flex items-center justify-center  '>
        <FileEdit className='mx-2' />
        <h1 className='text-center text-2xl font-medium'> Edit Product </h1>
      </div>
      <Table className="max-w-4xl mx-auto my-8" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            product && product.map((e, i) => {
              return <>
                <TableRow key={i}>
                  <TableCell className="font-medium uppercase"> {e.sku} </TableCell>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.price}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger className='ring-1 px-4 rounded-md ring-slate-200 hover:bg-slate-200 font-medium transition-all py-1'>Edit</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription className="flex flex-col gap-2 my-2">
                            <span>
                              <Label> Title </Label>
                              <Input onChange={(e) => setTitle(e.target.value)} value={title || e.title} />
                            </span>
                            <span>
                              <Label> Price </Label>
                              <Input onChange={(e) => setPrice(e.target.value)} value={price || e.price} />
                            </span>
                            <span>
                              <Label> Description </Label>
                              <Input onChange={(e) => setDescription(e.target.value)} value={description|| e.description} />
                            </span>
                            <span>
                              <Label> Specification </Label>
                              {
                                e.specification.map((e, i) => {
                                  return <div className='flex items-center' key={i}>
                                    <Input onChange={(e) => setName(e.target.value)} value={ name || e.name} />
                                    <p className='mx-1 font-medium'>:</p>
                                    <Input onChange={(e) => setValue(e.target.value)} value={value || e.value} />
                                  </div>
                                })
                              }
                            </span>
                            <span>
                              <Label> Color </Label>
                              {
                                e.variation.color.map((e, i) => {
                                  return <div className='flex items-center my-2' key={i}>
                                    <Input onChange={(e) => setColor(e.target.value)} value={color || `${e}`} key={i} />
                                  </div>
                                })
                              }
                            </span>
                            <Button  onClick={async () => {
                              const specification = {
                                name, value
                              }
                              const response = await updateProduct(title || e.title, price || e.price, description || e.description, specification || e.specification, color || e.color, e.images, e.sku)
                              console.log(response)
                            }}>
                              Update Product
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-400"
                              onClick={async () => {
                                const res = await deleteProduct(e.sku)
                                if (res.data.message === "Product deleted successfully!") {
                                  toast({
                                    title: "Product Deleted Successfully"
                                  })
                                }
                                window.location.reload()
                              }}
                            >
                              Delete this product
                            </Button>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              </>
            })
          }
        </TableBody>
      </Table>

    </main>
  )
}

export default EditProduct