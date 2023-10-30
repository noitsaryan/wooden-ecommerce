import { update } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, data, type } = await req.json();
    if (!email || !data || !type) {
      return NextResponse.json(
        {
          message: `Email, Data, or Type is missing`,
        },
        { status: 401 }
      );
    }
    await connectDB();
    const response = await update(email, data, type);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
