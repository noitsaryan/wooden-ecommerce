import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userSessionCookie = cookies().get("ashofy-user-session");
    
    if (!userSessionCookie)
      return NextResponse.json({
        success: false,
        message: "User not logged in",
      });

    const decodedToken = await decode(userSessionCookie.value);

    if (!decodedToken)
      return NextResponse.json({
        success: false,
        message: "Invalid user session",
      });

    await connectDB();

    const user = await User.findOne({ _id: decodedToken._id }).exec();

    if (!user)
      return NextResponse.json({
        success: false,
        message: "User does not exist",
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
