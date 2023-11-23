import React from 'react'

function page() {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow">
            <h1 className="text-4xl font-bold mb-6">Shipping &amp; Delivery</h1>
            <p className="mb-4">Last updated: 23/11/23</p>
            < h2 className="text-2xl font-bold mt-4" > 1. Shipping Policy</h2 >
            <p>We ship our products with great care to ensure they reach you in perfect condition. Please note the following:</p>
            <ul className="list-disc ml-6">
                <li>Every product is custom-made to order.</li>
                <li>Shipping times may vary based on product complexity and demand.</li>
                <li>Minimum shipping time is around 2-4 weeks and maximum shipping time ranges from 6-8 weeks.</li>
            </ul>
        </div>
    )
}

export default page