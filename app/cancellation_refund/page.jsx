// ShippingAndRefund.js

import React from 'react';

const ShippingAndRefund = () => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow">
            <h1 className="text-4xl font-bold mb-6">Cancellation and Refund Policy</h1>
            <p className="mb-4">Last updated: 23/11/23</p>

            <h2 className="text-2xl font-bold mt-4">1. Refund and Cancellation</h2>
            <p>Due to the custom-made nature of our products, we do not allow refunds or cancellations. Please consider your purchase carefully.</p>
            <ul className="list-disc ml-6">
                <li>No refunds are allowed once the order is confirmed and in production.</li>
                <li>If the product is damaged during shipping or upon installation, it can be repaired.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">2. Return or Exchange</h2>
            <p>We do not accept returns or exchanges except in the case of shipping damage or installation issues. Please follow these steps:</p>
            <ul className="list-disc ml-6">
                <li>Contact us at ashofy@ashokinteriors.com within 5 days of receiving the damaged product.</li>
                <li>Provide clear photos of the damage and a brief description of the issue.</li>
                <li>We will assess the situation and arrange for the repair of the damaged product.</li>
            </ul>

            <p className="mt-6">For any questions or concerns, please contact us at ashofy@ashokinteriors.com.</p>
        </div>
    );
};

export default ShippingAndRefund;
