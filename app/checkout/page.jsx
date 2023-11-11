"use client";
import BuyNow from "@/components/buttons/BuyNow";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input, Checkbox, } from "@nextui-org/react";
import axios from "axios";
import { storage } from "@/appwrite/appwrite.config";
import { useSession } from "next-auth/react";
import Product from "@/components/Cards/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function page() {
  const params = useSearchParams();
  const amount = params.get("amount");
  const order_id = params.get("order_id");
  const product_sku = params.get("product_sku");
  const quantity = params.get("quantity");
  const price = params.get("price");
  const totalPrice = params.get("totalPrice");
  const user_id = params.get("user_id");
  const email = params.get("email");
  const [image, setImage] = useState("");
  const [user, setUser] = useState();
  const session = useSession()
  const fetchProduct = async () => {
    try {
      const res = await axios.post('/api/get-product-id', {
        sku: product_sku,
      });

      setProduct(res.data);

      const images = await getImage(res.data.images[0]);
      setImage(images);
      fetchUserDetails()
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getImage = async (id) => {
    try {
      const imageLink = await storage.getFilePreview('65477266d57cd5b74b8c', id);
      return imageLink.href;
    } catch (error) {
      console.error("Error fetching image:", error);
      return "";
    }
  };

  const fetchUserDetails = async () => {
    if (!session) {
      return;
    }

    const email = session?.data?.user?.email;

    if (!email) {
      return;
    }

    const response = await axios.post('/api/get-user-by-id', {
      user: email,
      order: false,
    });

    if (!response) {
      return;
    }
    setUser(response);
  };

  const [phone, setPhone] = useState(null);
  const [check, setCheck] = useState(false);
  const [gstin, setGstin] = useState(null);
  const [address1, setaddress1] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });
  const [address2, setaddress2] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });
  const [isSelected, setIsSelected] = React.useState(false);
  const [product, setProduct] = useState({})
  // For Shipping Address
  const ShipAddress = (event) => {
    let { name, value } = event.target;
    setaddress1({
      ...address1,
      [name]: value,
    });
  };
  const BillAdress = (event) => {
    let { name, value } = event.target;
    setaddress2({
      ...address2,
      [name]: value,
    });
  };

  let shipngAddress = `Street Name: ${address1.strtName}, Building Name / Flat No: ${address1.bldgName}, Landmark: ${address1.Landmark}, Pincode: ${address1.zipcode}`;

  let bilgAddress = `Street Name: ${address2.strtName}, Building Name / Flat No: ${address2.bldgName}, Landmark: ${address2.Landmark}, Pincode: ${address2.zipcode}, GSTIN No. : ${gstin}`;


  const updateUser = async (type) => {
    try {
      if (type === 'address') {
        if(!shipngAddress || !bilgAddress ){
          return;
        }
        const response = await axios.post('/api/update-user', {
          email, type: "address", data: {
            shipping_address: shipngAddress,
            billing_address: bilgAddress
          }
        })
      } else if (type === 'phone') {
        if(!phone){
          return;
        }
        const response = await axios.post('/api/update-user', {
          email, type: "phone", data: phone
        })
      } else if (type === 'gst') {
        if(!gstin){
          return;
        }
        const response = await axios.post('/api/update-user', {
          email, type: "gst", data: gstin
        })
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  useEffect(() => {
    fetchUserDetails();
  }, [session]);


  return (
    <main className="h-auto w-full">
      <h2 className="w-full text-center p-2  font-semibold text-2xl  ">
        Checkout
      </h2>
      <section className="flex gap-2 w-full h-full p-4 md:flex-row flex-col-reverse">
        <section className="w-full md:w-3/4 h-full border-slate-400 rounded-md border  p-4 md:p-8 flex flex-col gap-3">
          <div>
            <h2 className="text-xl font-light ">Shipping Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <Input
                type="text"
                label="Street Name"
                required
                size="sm"
                variant="bordered"
                name="strtName"
                labelPlacement="outside"
                placeholder="Enter Street Name"
                onChange={ShipAddress}
              />
              <Input
                type="text"
                label="Building Name"
                required
                name="bldgName"
                size="sm"
                variant="bordered"
                placeholder="Enter Building Name"
                labelPlacement="outside"
                onChange={ShipAddress}
              />

              <Input
                type="text"
                label="Landmark"
                placeholder="Enter Landmark Name"
                required
                size="sm"
                variant="bordered"
                name="Landmark"
                labelPlacement="outside"
                onChange={ShipAddress}
              />

              <Input
                type="number"
                label="Pincode"
                placeholder="Enter Pincode"
                required
                size="sm"
                variant="bordered"
                name="zipcode"
                labelPlacement="outside"
                onChange={ShipAddress}
              />
            </div>
          </div>
          <hr />
          <div>
            <h2 className="text-xl font-light ">Billing Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <Input
                type="text"
                label="Street Name"
                required
                size="sm"
                variant="bordered"
                name="strtName"
                labelPlacement="outside"
                value={address2.strtName}
                placeholder="Enter Street Name"
                onChange={BillAdress}
              />
              <Input
                type="text"
                label="Building Name"
                required
                size="sm"
                variant="bordered"
                value={address2.bldgName}
                name="bldgName"
                placeholder="Enter Building Name"
                labelPlacement="outside"
                onChange={BillAdress}
              />

              <Input
                type="text"
                label="Landmark"
                placeholder="Enter Landmark Name"
                required
                size="sm"
                variant="bordered"
                value={address2.Landmark}
                name="Landmark"
                labelPlacement="outside"
                onChange={BillAdress}
              />

              <Input
                type="number"
                label="Pincode"
                placeholder="Enter Pincode"
                required
                size="sm"
                variant="bordered"
                value={address2.zipcode}
                name="zipcode"
                labelPlacement="outside"
                onChange={BillAdress}
              />
            </div>
            <Input
              type="number"
              label="GST No."
              placeholder="Enter GST (15 Digit)"
              required
              size="sm"
              variant="bordered"
              name="gstin"
              labelPlacement="outside"
              onChange={(e) => setGstin(e.target.value)}
            />

            <span className="mt-2 font-semibold text-xs opacity-70 flex items-center  gap-2">
              <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                onClick={(e) => {
                  isSelected ? setCheck(true) : setCheck(false);

                  isSelected
                    ? setaddress2({
                      ...address2,
                    })
                    : setaddress2({
                      ...address1,
                    });
                }}
              >
                <span className="text-xs"> Same as shipping address </span>
              </Checkbox>
            </span>
          </div>
          <hr />
          <div>
            <hr />
            <span className="flex flex-col  w-full md:w-64 ">
              <Input
                type="number"
                size="sm"
                labelPlacement="outside"
                label="Phone No"
                className="p-1 rounded"
                placeholder="Enter Your Phone Number (10 Digit)"
                required
                variant="bordered"
                onChange={(e) => setPhone(e.target.value)}
                min={9999999999}
                max={9999999999}
              />
            </span>
            <p className="font-semibold text-xs opacity-70">
              This phone number should be active
            </p>
          </div>
          <div onClick={async () => {
            await updateUser('address');
            await updateUser('phone')
            await updateUser('gst')
          }}>
            <BuyNow
              amount={parseFloat(quantity * parseFloat(price))}
              order_id={order_id}
              product_sku={product_sku}
              quantity={quantity}
              price={price}
              totalPrice={totalPrice}
              user_id={user_id}
              email={email}
            />
          </div>
        </section>
        <section className="md:w-3/12 h-full p-2 w-full border-slate-400  rounded-md border  py-5">
          <h2 className="font-light text-xl">Order Summary</h2>
          <Product
            title={product.title}
            price={price}
            sku={product_sku}
            link={image}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Quantity</TableHead>
                <TableHead className="w-[100px]">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{quantity}</TableCell>
                <TableCell className="">₹{parseFloat(quantity * parseFloat(price)).toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </section>
      </section>
    </main>
  );
}

export default page;