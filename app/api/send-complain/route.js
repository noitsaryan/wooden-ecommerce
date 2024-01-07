import { sendMail } from "@/utils/services/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, phone, complain } = await req.json();
    let subject = "Query | Complaint - Ashofy";
    await sendMail(
      subject,
      "ashofy@ashokinteriors.com",
      `
        Email: ${email}<br/>
        Phone: ${phone}<br/>
        Concern: ${complain}
    `
    );
    return NextResponse.json({
      success: true,
      message: "Mail Sent Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
