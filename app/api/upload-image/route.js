import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
