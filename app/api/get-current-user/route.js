import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const Id = cookies().get("user")?.value;

    if (!Id)
      return NextResponse.json({
        success: false,
        message: "User not logged in",
      });

    await connectDB();

    const user = await User.findOne({ _id: Id }).exec();

    if (!user)
      return NextResponse.json({
        success: false,
        message: "User does not exists",
      });

    return NextResponse.json({
      success: true,
      message: "User fetched",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
