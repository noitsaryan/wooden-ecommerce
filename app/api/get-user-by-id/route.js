import { fetchUserByEmailId } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user, order } = await req.json();
    // if (!user || !order) {
    //   return NextResponse.json(
    //     { message: "Missing Order or User Params" },
    //     { status: 401 }
    //   );
    // }
    await connectDB();
    const res = await fetchUserByEmailId(user, order);
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
