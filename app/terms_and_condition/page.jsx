// TermsAndConditions.js

import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow">
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            <p className="mb-4">Effective Date: 23/11/23</p>

            <h2 className="text-2xl font-bold mt-4">1. Contact Information</h2>
            <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at ashofy@ashokinteriors.com.</p>

            <h2 className="text-2xl font-bold mt-4">2. Limitation of Liability and Disclaimer of Warranties</h2>
            <p>By using the Ashofy website, you agree that:</p>
            <ul className="list-disc ml-6">
                <li>We are not responsible for any damage or loss related to your use of the website.</li>
                <li>We do not guarantee the accuracy, completeness, or timeliness of the information on the website.</li>
                <li>We disclaim all warranties, express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">3. Rules of Conduct</h2>
            <p>While using the Ashofy website, you agree to abide by the following rules of conduct:</p>
            <ul className="list-disc ml-6">
                <li>Do not violate any applicable laws or regulations.</li>
                <li>Do not infringe on the rights of others, including intellectual property rights.</li>
                <li>Do not engage in any form of deceptive or misleading conduct.</li>
                <li>Do not upload or transmit any harmful or malicious content.</li>
                <li>Do not interfere with the proper functioning of the website.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">4. User Restrictions</h2>
            <p>When using the Ashofy website, you are restricted from:</p>
            <ul className="list-disc ml-6">
                <li>Attempting to gain unauthorized access to the website or any of its features.</li>
                <li>Using the website for any unlawful purpose.</li>
                <li>Engaging in any conduct that restricts or inhibits any other user from using or enjoying the website.</li>
                <li>Reverse engineering, decompiling, or disassembling any part of the website.</li>
            </ul>

            <p className="mt-6">These Terms and Conditions are subject to change. Changes will take effect immediately upon their posting on the website.</p>
        </div>
    );
};

export default TermsAndConditions;
