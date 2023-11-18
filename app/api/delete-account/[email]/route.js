import { deleteAccount } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const {email} = params
    await connectDB();
    const res = await deleteAccount(email);
    return NextResponse.json(res);
  } catch (error) {
    const errorMessage = error.message || "Account deletion failed.";
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
