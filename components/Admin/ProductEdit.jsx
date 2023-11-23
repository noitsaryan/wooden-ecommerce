import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { storage } from '@/appwrite/appwrite.config';
import Image from 'next/image';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../ui/button';
import axios from 'axios';
import { useToast } from '../ui/use-toast';

const ImageArray = ({ content }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <Image
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            src={content.link}
            width={100}
            height={100}
            alt='Product_Images'
        />
    );
};

function ProductEdit({ values }) {
    const [data, setData] = useState({
        category: '',
        description: '',
        images: [],
        maintenance: '',
        warranty: '',
        price: 0,
        specification: [],
        subCategory: '',
        title: '',
        variation: {
            color: [],
            size: [],
        },
        sku: "",
    });

    const [input, setInput] = useState({
        category: '',
        description: '',
        maintenance: '',
        warranty: '',
        price: 0,
        subCategory: '',
        title: '',
        sku: "",
        newColor: "",
    });

    const [images, setImages] = useState([]);
    const [firstImages, setFirstImages] = useState([]);
    const [colorState, setColorState] = useState([]);
    const { toast } = useToast()

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const getPreview = () => {
        try {
            if (!values) { console.log('Not fetched'); return; }
            const array = [];
            data && data.images.map((e, i) => {
                let image;
                if (typeof e === 'object' && e.link && e.id) {
                    image = { href: e.link, id: e.id };
                } else if (typeof e === 'string') {
                    image = storage.getFilePreview('655a5d3abb5e5f5b80cc', e);
                } else {
                    console.log(`Unsupported data format at index ${i}`);
                    return;
                }
                const updatedLink = image.href.replace('/preview?', '/view?');
                array.push({ link: updatedLink, id: `image-${i}` });
            });
            console.log(array)
            setImages(array);
            console.log('Ive ranned')
        } catch (error) {
            console.log(error.message);
        }
    };
    const isArrayofObjects = (value) => {
        return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object';
    };
    const getFilePreview = (image) => {
        if (isArrayofObjects(image)) {
            const firstImage = image[0].link || '';
            setFirstImages(firstImage)
            return;
        }
        if (Array.isArray(image) && image.length > 0 && typeof image[0] === 'string') {
            const firstImage = getModifiedUrl(image[0])
            setFirstImages(firstImage)
            return;
        }
        if (typeof image === 'string') {
            return getModifiedUrl(image);
        }
        return '';
    };
    const getModifiedUrl = (image) => {
        const imageLink = storage.getFilePreview('655a5d3abb5e5f5b80cc', image);
        return imageLink.href.replace('/preview?', '/view?');
    };
    const handleDragEnd = (result) => {
        const { active, over } = result;
        if (active.id === over.id) {
            return;
        }
        setImages((img) => {
            const oldIndex = img.findIndex((e) => e.id === active.id);
            const newIndex = img.findIndex((e) => e.id === over.id);
            const array = arrayMove(img, oldIndex, newIndex);
            return array;
        });
    };
    const handleAddColor = () => {
        const newColor = input.newColor;
        if (!data.variation.color.includes(newColor)) {
            setColorState((prevColors) => [...prevColors, newColor]);
            setData((prevData) => ({
                ...prevData,
                variation: {
                    ...prevData.variation,
                    color: [...prevData.variation.color, newColor],
                },
            }));
        }

        setInput((prevInput) => ({
            ...prevInput,
            newColor: '',
        }));
    };
    const handleAddSize = () => {
        const newName = input.newName;
        const newMeasure = input.newMeasure;
        const newPrice = input.newPrice;

        if (newName && newMeasure && newPrice) {
            setData((prevData) => ({
                ...prevData,
                variation: {
                    ...prevData.variation,
                    size: [...prevData.variation.size, { name: newName, measure: newMeasure, price: newPrice }],
                },
            }));

            setInput((prevInput) => ({
                ...prevInput,
                newName: '',
                newMeasure: '',
                newPrice: '',
            }));
        }
    };
    const handleAddSpecification = () => {
        const newName = input.newSpecName;
        const newValue = input.newSpecValue;

        if (newName && newValue) {
            setData((prevData) => ({
                ...prevData,
                specification: [...prevData.specification, { name: newName, value: newValue }],
            }));

            setInput((prevInput) => ({
                ...prevInput,
                newSpecName: '',
                newSpecValue: '',
            }));
        }
    };
    const changeColor = (e, i) => {
        const updatedColors = [...data.variation.color];
        updatedColors[i] = e.target.value;

        setData((prevData) => ({
            ...prevData,
            variation: {
                ...prevData.variation,
                color: updatedColors,
            },
        }));
    }
    const updateProducts = async () => {
        try {
            const response = await axios.put("/api/update-product", {
                title: input.title,
                price: parseInt(input.price),
                description: input.description,
                specification: data.specification,
                color: data.variation.color,
                images,
                sku: input.sku,
                size: data.variation.size,
                warranty: input.warranty,
                maintenance: input.maintenance,
            });
            if (response.data) {
                toast({
                    title: 'Product Updated'
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const deleteProduct = async () => {
        try {
            const product = await axios.post('/api/delete-product', {
                sku: values.sku
            })
            console.log(product)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        setInput({
            category: values.category,
            description: values.description,
            maintenance: values.maintenance,
            warranty: values.warranty,
            price: values.price,
            subCategory: values.subCategory,
            title: values.title,
            sku: values.sku,
        });
        setData({
            images: values.images,
            specification: values.specification,
            variation: {
                color: values.variation.color,
                size: values.variation.size,
            },
        });
        getFilePreview(values.images)
        getPreview();
    }, [values]);
    useEffect(() => {
        getPreview();
    }, [data])

    return (
        <TableBody>
            <TableRow>
                <TableCell className="font-medium">
                    <Image
                        src={firstImages}
                        alt='Edit_product_Image'
                        width={100}
                        height={100}
                    />
                </TableCell>
                <TableCell className="font-medium">{values.title}</TableCell>
                <TableCell className="uppercase">{values.sku}</TableCell>
                <TableCell>Rs. {parseFloat(values.price).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                    <Dialog>
                        <DialogTrigger className='cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-black/60 transition-all'>
                            Edit
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Your Product Here</DialogTitle>
                                <div className='space-y-2 py-2'>
                                    <Input placeholder="Title" onChange={handleChange} name="title" value={input.title} />
                                    <textarea className="w-full border p-2 rounded-md" placeholder="Description" onChange={handleChange} name="description" value={input.description} />
                                    <Input placeholder="Warranty" onChange={handleChange} name="warranty" value={input.warranty} />
                                    <Input placeholder="Price" onChange={handleChange} name="price" value={input.price} />
                                    <Input placeholder="Sub Category" onChange={handleChange} name="subCategory" value={input.subCategory} />
                                    <Input placeholder="Category" onChange={handleChange} name="category" value={input.category} />
                                    <Input placeholder="Maintenance" onChange={handleChange} name="maintenance" value={input.maintenance} />

                                    <Dialog>
                                        <DialogTrigger className='bg-black/80 px-4 py-2 mx-2 text-white rounded-md '>Edit Images</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Images Here</DialogTitle>
                                                <DialogDescription asChild>
                                                    <div className='flex gap-3 p-2 flex-wrap images'>
                                                        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                                                            <SortableContext items={images} strategy={verticalListSortingStrategy}>
                                                                {images && images.map((e) => (
                                                                    <ImageArray key={e.id} content={e} />
                                                                ))}
                                                            </SortableContext>
                                                        </DndContext>
                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger className='bg-black/80 px-4 py-2 mx-2 text-white rounded-md '>Edit Specification</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Specifications</DialogTitle>
                                                <div className='space-y-2'>
                                                    {data && data.specification.map((e, i) => (
                                                        <div key={i} className='flex items-center'>
                                                            <Input
                                                                placeholder="Key"
                                                                onChange={(event) => {
                                                                    const updatedSpecs = [...data.specification];
                                                                    updatedSpecs[i].name = event.target.value;

                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        specification: updatedSpecs,
                                                                    }));
                                                                }}
                                                                value={e.name}
                                                            />
                                                            <p className='mx-2'> : </p>
                                                            <Input
                                                                placeholder="Value"
                                                                onChange={(event) => {
                                                                    const updatedSpecs = [...data.specification];
                                                                    updatedSpecs[i].value = event.target.value;

                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        specification: updatedSpecs,
                                                                    }));
                                                                }}
                                                                value={e.value}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className='flex space-x-2 items-center'>
                                                        <Input
                                                            placeholder="Add Key"
                                                            onChange={(event) => setInput((prevInput) => ({ ...prevInput, newSpecName: event.target.value }))}
                                                            value={input.newSpecName || ''}
                                                        />
                                                        <p className='mx-2'>:</p>
                                                        <Input
                                                            placeholder="Add Value"
                                                            onChange={(event) => setInput((prevInput) => ({ ...prevInput, newSpecValue: event.target.value }))}
                                                            value={input.newSpecValue || ''}
                                                        />
                                                        <Button onClick={handleAddSpecification}>Add</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger className='bg-black/80 px-4 py-2 mx-2 text-white rounded-md '>Edit Color</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Color</DialogTitle>
                                                <div className='space-y-2'>
                                                    {data && data.variation.color.map((e, i) => (
                                                        <Input value={e} key={i} onChange={(change) => changeColor(change, i)} />
                                                    ))}
                                                    <div className='space-x-2 flex items-center'>
                                                        <Input
                                                            placeholder='Enter Color Code'
                                                            onChange={handleChange}
                                                            name='newColor'
                                                            value={input.newColor || ''}
                                                        />
                                                        <Button onClick={handleAddColor}>Add</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger className='bg-black/80 px-4 py-2 mx-2 text-white rounded-md '>Edit Size</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Sizes</DialogTitle>
                                                <div className='space-y-2'>
                                                    {data && data.variation.size.map((e, i) => (
                                                        <div key={i} className='flex items-center'>
                                                            <Input
                                                                placeholder="Name"
                                                                onChange={(event) => {
                                                                    const updatedSizes = [...data.variation.size];
                                                                    updatedSizes[i].name = event.target.value;

                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        variation: {
                                                                            ...prevData.variation,
                                                                            size: updatedSizes,
                                                                        },
                                                                    }));
                                                                }}
                                                                value={e.name}
                                                            />
                                                            <p className='mx-2'> : </p>
                                                            <Input
                                                                placeholder="Measure"
                                                                onChange={(event) => {
                                                                    const updatedSizes = [...data.variation.size];
                                                                    updatedSizes[i].measure = event.target.value;

                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        variation: {
                                                                            ...prevData.variation,
                                                                            size: updatedSizes,
                                                                        },
                                                                    }));
                                                                }}
                                                                value={e.measure}
                                                            />
                                                            <p className='mx-2'> : </p>
                                                            <Input
                                                                placeholder="Price"
                                                                onChange={(event) => {
                                                                    const updatedSizes = [...data.variation.size];
                                                                    updatedSizes[i].price = event.target.value;

                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        variation: {
                                                                            ...prevData.variation,
                                                                            size: updatedSizes,
                                                                        },
                                                                    }));
                                                                }}
                                                                value={e.price}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className='flex space-x-2 items-center'>
                                                        <Input
                                                            placeholder="Add Name"
                                                            onChange={(event) => setInput((prevInput) => ({ ...prevInput, newName: event.target.value }))}
                                                            value={input.newName || ''}
                                                        />
                                                        <p className='mx-2'>:</p>
                                                        <Input
                                                            placeholder="Add Measure"
                                                            onChange={(event) => setInput((prevInput) => ({ ...prevInput, newMeasure: event.target.value }))}
                                                            value={input.newMeasure || ''}
                                                        />
                                                        <p className='mx-2'>:</p>
                                                        <Input
                                                            placeholder="Add Price"
                                                            onChange={(event) => setInput((prevInput) => ({ ...prevInput, newPrice: event.target.value }))}
                                                            value={input.newPrice || ''}
                                                        />
                                                        <Button onClick={handleAddSize}>Add</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>

                                    <Button onClick={updateProducts} className="block w-full border bg-transparent hover:bg-black text-black hover:text-white ">Update</Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className='mx-2'><RiDeleteBin5Line /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <div className='space-y-3 py-3'>
                                    <p>Your Product : <span className='uppercase '>{values.sku}</span> will be deleted permanently?</p>
                                    <Button onClick={deleteProduct} className="bg-red-600 rounded-md mx-2 h-9">Delete</Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}

export default ProductEdit;