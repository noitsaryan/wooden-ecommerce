// PrivacyPolicy.js

import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last updated: 23/11/23</p>

            <h2 className="text-2xl font-bold mt-4">1. Introduction</h2>
            <p>Ashofy ("we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, and safeguard your personal information when you use our website or mobile application.</p>

            <h2 className="text-2xl font-bold mt-4">2. Information We Collect</h2>
            <p>We may collect the following personal information from users for account-related purposes:</p>
            <ul className="list-disc ml-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>GST number</li>
                <li>Shipping address</li>
                <li>Billing address</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">3. How We Collect Information</h2>
            <p>We collect personal information through:</p>
            <ul className="list-disc ml-6">
                <li>Account registration forms</li>
                <li>Order forms</li>
                <li>Communications with our customer support</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">4. How We Use Collected Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc ml-6">
                <li>To create and manage user accounts</li>
                <li>To process and fulfill orders</li>
                <li>To communicate with users about their orders</li>
                <li>To provide customer support</li>
                <li>To send promotional and marketing communications (if opted in)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">5. Information Security</h2>
            <p>We take reasonable steps to ensure the security of your personal information. This includes implementing technical and organizational measures to prevent unauthorized access, disclosure, alteration, or destruction.</p>

            <h2 className="text-2xl font-bold mt-4">6. Information Sharing with Third Parties</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except for the following circumstances:</p>
            <ul className="list-disc ml-6">
                <li>Service Providers: We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you.</li>
                <li>Legal Compliance: We may disclose information when we believe in good faith that disclosure is necessary to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">7. Your Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6">
                <li>Access, correct, or delete your personal information</li>
                <li>Opt-out of receiving marketing communications</li>
                <li>Close your account</li>
            </ul>

            <h2 className="text-2xl font-bold mt-4">8. Changes to This Privacy Policy</h2>
            <p>We reserve the right to modify this Privacy Policy at any time. Changes and clarifications will take effect immediately upon their posting on the website.</p>

            <h2 className="text-2xl font-bold mt-4">9. Contact Us</h2>
            <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at info@ashofy.com.</p>

            <p className="mt-6">By using our website, you consent to the terms of this Privacy Policy.</p>
        </div>
    );
};

export default PrivacyPolicy;
