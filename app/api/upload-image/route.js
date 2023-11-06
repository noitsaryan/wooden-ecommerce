import { NextResponse } from "next/server";

export async function POST(req) {
  try {
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
