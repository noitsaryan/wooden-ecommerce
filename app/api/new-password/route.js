import { resetUserPasswordWithPassword } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, existing_password, new_password } = await req.json();
    await connectDB();
    const res = await resetUserPasswordWithPassword(
      email,
      existing_password,
      new_password
    );
    return NextResponse.json({res})
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
