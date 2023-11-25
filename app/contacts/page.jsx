// ContactPage.js

import Link from "next/link";
import React from "react";

const ContactPage = () => {
  return (

    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">Last updated: 23/11/23</p>
      < h2 className="text-2xl font-bold mt-4" > 1. Details</h2 >
      <ul className="list-disc ml-6">
        <li>Operational Address: Shop No-03, C-23, Poonam Sagar Complex, Mira Road(E), Thane,
          Maharashtra, Pin - 401107</li>
        <li>Email: ashofy@ashokinteriors.com</li>
        <li>Phone: +91 98192 15088</li>
      </ul>
    </div >
  );
};

export default ContactPage;
