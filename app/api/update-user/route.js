import { update } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, data, type, cartType } = await req.json();
    await connectDB();
    const response = await update(email, data, type, cartType);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
