import React from 'react';

const page = () => {
  return (
    <section  className='p-2 flex flex-col items-center justify-center w-screen space-y-9'>
      <h2 className='bg-Primary px-1 text-white text-3xl font-light '>Return Policy - Ashofy</h2>
      <div  className='max-w-3xl space-y-7'>
        <div>
         <b> 1. General Policy:</b>
          <ul>
            <li>Ashofy offers a hassle-free return policy for all furniture and interior decor products purchased from our website.</li>
            <li>Customers are eligible to return products within 30 days from the date of delivery.</li>
          </ul>
        </div>

        <div>
            <b>
          2. Eligibility Criteria:

            </b>
          <ul>
            <li>To be eligible for a return, the product must be unused, undamaged, and in its original packaging.</li>
            <li>Custom-made or personalized products cannot be returned unless they are defective or damaged upon delivery.</li>
          </ul>
        </div>

        <div className='space-y-3'>
            <b>
          3. Return Process:

            </b>
          <ol type="a" className='space-y-3'>
            <li>
              Initiation:<br />
              - Customers must initiate the return process by contacting Ashofy's customer support team via email or phone within 30 days of receiving the product.<br />
              - Provide the order details, reason for the return, and any supporting documentation, such as photographs, if applicable.
            </li>
            <li>
              Evaluation and Approval:<br />
              - Ashofy will review the return request and evaluate the eligibility of the product for return.<br />
              - Approved returns will receive a return authorization code and further instructions on how to proceed.
            </li>
            <li>
              Packaging and Shipping:<br />
              - Customers are responsible for securely packaging the product in its original packaging to prevent damage during return transit.<br />
              - Ashofy will provide the shipping address and any necessary shipping labels or documentation for the return.
            </li>
            <li>
              Inspection and Refund/Exchange:<br />
              - Upon receiving the returned product, Ashofy will inspect it for any damages or discrepancies.<br />
              - If the product meets the return eligibility criteria, customers will have the option to choose either a refund or an exchange for another product of equal value.<br />
              - Refunds will be issued to the original payment method within [X] business days.<br />
              - Exchanges will be processed and shipped according to Ashofy's standard shipping policies.
            </li>
          </ol>
        </div>

        <div>
            <b>
          4. Non-Returnable Items:

            </b>
          <ul>
            <li>Certain items are non-returnable, including:</li>
            <ul>
              <li>Clearance or sale items</li>
              <li>Gift cards</li>
              <li>Used or damaged products due to customer negligence</li>
            </ul>
          </ul>
        </div>

        <div>
            <b>
          5. Damaged or Defective Products:

            </b>
          <ul>
            <li>In the case of damaged or defective products received, customers must notify Ashofy within 48 hours of delivery.</li>
            <li>Provide detailed information and supporting documentation (such as photographs) to expedite the resolution process.</li>
            <li>Ashofy will arrange for a return or replacement at no additional cost to the customer.</li>
          </ul>
        </div>

        <div>
            <b>
          6. Return Shipping Costs:

            </b>
          <ul>
            <li>If the return is due to customer preference or non-defective reasons, customers will be responsible for the return shipping costs.</li>
            <li>In cases of damaged or defective products, Ashofy will cover the return shipping costs.</li>
          </ul>
        </div>

        <div>
          Please note that this return policy is subject to change, and customers are encouraged to review the latest version on the Ashofy website or contact customer support for any clarifications.
        </div>
      </div>
    </section>
  );
};

export default page;
