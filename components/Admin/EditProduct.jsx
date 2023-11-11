import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  FileEdit
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { Label, createDropdownMenuScope } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import { deleteProduct, updateProduct } from '@/utils/lib/products';
import { useToast } from '../ui/use-toast';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState({
    title: String,
    price: Number,
    description: String,
    warranty: String,
    maintenance: String,
  })
  const [editedSpecifications, setEditedSpecifications] = useState({});
  const [editedSizes, setEditedSizes] = useState([]);
  const [editedColors, setEditedColors] = useState([]);
  const { toast } = useToast();
  const { title, price, description, warranty, maintenance } = details

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  async function getProducts() {
    const res = await fetch('/api/get-products');
    const data = await res.json();
    setProducts(data);
  }

  async function updateProducts(sku, images) {
    try {
      const specs = editedSpecifications[sku]
      const size = editedSizes[sku]
      const colors = editedColors[sku]
      const res = await updateProduct(title || products.title, price || products.price, description || products.description, specs || products.specification, colors || products.variation.color, images, sku, size || products.variation.size, warranty || products.warranty, maintenance || products.maintenance)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteProductData(sku) {
    const res = await deleteProduct(sku);
    if (res.data.message === "Product deleted successfully!") {
      toast({
        title: "Product Deleted Successfully"
      });
      getProducts();
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <div className='flex items-center justify-center'>
        <FileEdit className='mx-2' />
        <h1 className='text-center text-2xl font-medium'>Edit Product</h1>
      </div>
      <Table className="max-w-4xl mx-auto my-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products && products.map((product, index) => (
            <TableRow key={index}>
              <TableHead className="w-[100px]">{product.sku}</TableHead>
              <TableHead>{product.title}</TableHead>
              <TableHead>{product.price}</TableHead>
              <TableHead className="text-right">
                <Dialog className="max-w-4xl w-full">
                  <DialogTrigger>
                    <Button variant="outline">View</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit / Delete Product</DialogTitle>
                      <div className="space-y-2 max-h-[60vh] overflow-y-scroll">
                        <Label>Title</Label>
                        <Input placeholder={product.title} name="title"
                          value={title} onChange={handleChange} />
                        <Label>Price</Label>
                        <Input placeholder={product.price} name="price"
                          value={price} onChange={handleChange} />
                        <Label>Description</Label>
                        <Input placeholder={product.description} name="description"
                          value={description} onChange={handleChange} />
                        <Label>Warranty</Label>
                        <Input placeholder={product.warranty} name="warranty"
                          value={warranty} onChange={handleChange} />
                        <Label>Maintenance</Label>
                        <Input placeholder={product.maintenance} name="maintenance"
                          value={maintenance} onChange={handleChange} />
                        <Label> Specification </Label>
                        {product.specification.map((data, i) => (
                          <div className='flex items-center gap-2' key={i}>
                            <Input
                              placeholder={data.name}
                              onChange={(e) => {
                                const newSpecifications = { ...editedSpecifications };
                                newSpecifications[product.sku] = newSpecifications[product.sku] || [];
                                newSpecifications[product.sku][i] = {
                                  ...newSpecifications[product.sku][i],
                                  name: e.target.value,
                                };
                                setEditedSpecifications(newSpecifications);
                              }}
                            />
                            <Input
                              placeholder={data.value}
                              onChange={(e) => {
                                const newSpecifications = { ...editedSpecifications };
                                newSpecifications[product.sku] = newSpecifications[product.sku] || [];
                                newSpecifications[product.sku][i] = {
                                  ...newSpecifications[product.sku][i],
                                  value: e.target.value,
                                };
                                setEditedSpecifications(newSpecifications);
                              }}
                            />
                          </div>
                        ))}
                        <Label> Color </Label>
                        {product.variation.color.map((color, i) => (
                          <Input
                            placeholder={color}
                            key={i}
                            onChange={(e) => {
                              const newColors = { ...editedColors };
                              newColors[product.sku] = newColors[product.sku] || [];
                              newColors[product.sku][i] = e.target.value;
                              setEditedColors(newColors);
                            }}
                          />
                        ))}
                        <Label> Size </Label>
                        {product.variation.size.map((size, i) => (
                          <div className='flex items-center gap-2' key={i}>
                            <Input
                              placeholder={size.name}
                              onChange={(e) => {
                                const newSizes = { ...editedSizes };
                                newSizes[product.sku] = newSizes[product.sku] || [];
                                newSizes[product.sku][i] = {
                                  ...newSizes[product.sku][i],
                                  name: e.target.value,
                                };
                                setEditedSizes(newSizes);
                              }}
                            />
                            <Input
                              placeholder={size.price}
                              onChange={(e) => {
                                const newSizes = { ...editedSizes };
                                newSizes[product.sku] = newSizes[product.sku] || [];
                                newSizes[product.sku][i] = {
                                  ...newSizes[product.sku][i],
                                  price: e.target.value,
                                };
                                setEditedSizes(newSizes);
                              }}
                            />
                            <Input
                              placeholder={size.measures}
                              onChange={(e) => {
                                const newSizes = { ...editedSizes };
                                newSizes[product.sku] = newSizes[product.sku] || [];
                                newSizes[product.sku][i] = {
                                  ...newSizes[product.sku][i],
                                  measures: e.target.value,
                                };
                                setEditedSizes(newSizes);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <Button className="w-full bg-green-500 hover:bg-green-300 " onClick={async () => await updateProducts(product.sku, product.images)} >Update Product</Button>
                        <Button className="w-full bg-red-500 hover:bg-red-300 " onClick={() => deleteProductData(product.sku)}>Delete Product</Button>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default EditProduct;
