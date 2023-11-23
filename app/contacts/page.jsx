import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="p-2 flex flex-col items-center justify-center w-screen space-y-9">
      <h2 className="bg-Primary px-1 text-white text-3xl font-light ">
        Contacts
      </h2>
      <div className="max-w-3xl space-y-10">
        <ul>
          <li>
            <b>Operational Address: </b> Shop No-03, C-23, Poonam Sagar Complex, Mira Road(E), Thane,
            Maharashtra, Pin - 401107
          </li>
          <li> <b className="font-bold">Email: </b> <Link href="mailto:info@ashofy.com" className="hover:text-Primary hover:underline">info@ashofy.com</Link>
          </li>
          <li> <b className="font-bold">Phone: </b>+91 98192 15088
          </li>
        </ul>
      </div>
    </section>
  );
};

export default page;
