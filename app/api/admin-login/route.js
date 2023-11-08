import { adminLogin } from "@/models/admin.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import randomToken from "random-token";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!password || !email) {
      return NextResponse.json({
        message: "Password or email is missing",
      });
    }

    const token = randomToken(18);

    const res = await adminLogin(email, password, token)

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
