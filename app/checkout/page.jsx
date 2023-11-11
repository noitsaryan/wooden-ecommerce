"use client";
import BuyNow from "@/components/buttons/BuyNow";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";

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

  const [value, setValue] = useState(1);
  const [shipping_address, setShipping_Address] = useState(null);
  const [billing_address, setBilling_Address] = useState(null);
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

  // For Shipping Address
  const ShipAddress = (event) => {
    let { name, value } = event.target;
    setaddress1({
      ...address1,
      [name]: value,
    });
  };

  // For Billing Address
  const BillAdress = (event) => {
    let { name, value } = event.target;
    setaddress2({
      ...address2,
      [name]: value,
    });
  };

  let shipngAddress = `Street Name: ${address1.strtName}, Building Name / Flat No: ${address1.bldgName}, Landmark: ${address1.Landmark}, Pincode: ${address1.zipcode}`;

  let bilgAddress = `Street Name: ${address2.strtName}, Building Name / Flat No: ${address2.bldgName}, Landmark: ${address2.Landmark}, Pincode: ${address2.zipcode}, GSTIN No. : ${gstin}`;

  const ProceedChk = () => {
    setShipping_Address(shipngAddress);

    setBilling_Address(check ? shipngAddress : bilgAddress);

    console.log(check ? shipngAddress : bilgAddress);
    console.log(data);
  };

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
                <span className="text-xs"> Same as shipping address</span>
              </Checkbox>
            </span>
          </div>
          <hr />

          <div className="flex items-center gap-2">
            <p className="font-light">Set Quantity</p>
            <Button className="border flex w-36 justify-around p-1 rounded-md select-none mt-1 text-xl">
              <p onClick={() => setValue((prev) => prev - 1)}>-</p>
              <h2 className="font-semibold text-sm">
                {" "}
                {value < 1 ? setValue(1) : value}{" "}
              </h2>
              <p onClick={() => setValue((prev) => prev + 1)}>+</p>
            </Button>
          </div>
          <div>
            <hr />
            <span className="flex flex-col  w-full md:w-64 ">
              <Input
                type="number"
                size="sm"
                labelPlacement="outside"
                label="Phone No"
                className="p-1 rounded"
                placeholder="Enter Your Phone Number"
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
            <BuyNow
              amount={amount}
              order_id={order_id}
              product_sku={product_sku}
              quantity={quantity}
              price={price}
              totalPrice={totalPrice}
              user_id={user_id}
              email={email}
            />
        </section>
        <section className="md:w-3/12 h-full p-2 w-full border-slate-400  rounded-md border  py-5">
          <h2 className="font-light text-xl">Order Summary</h2>
          <div>
            <div className="w-full h-72 bg-white shadow rounded mt-2 bg-[url('/img/hero-pattern.svg')]">
              <Image
                src="/"
                width={150}
                height={150}
                className="object-contain"
                alt="image"
              />
            </div>
            <span className="flex gap-2  mt-3">
              <h3 className=" font-semibold  whitespace-nowrap">
                Product name:
              </h3>
              <p className="opacity-75 truncate">Product Title</p>
            </span>
            <span className="flex gap-2">
              <h3 className=" font-semibold ">Subtotal:</h3>{" "}
              <p className="opacity-75">Rs. {2000 * value}</p>
            </span>
            <hr />
            <span className="flex gap-2">
              <h3 className=" font-semibold ">Total:</h3>{" "}
              <p className="opacity-75">Rs. {3000 * value}</p>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
}

export default page;