import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUserData() {
  const userSessionCookie = cookies().get("ashofy-user-session");

  if (!userSessionCookie) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const decodedToken = await decode(userSessionCookie.value);

  if (!decodedToken) {
    return {
      success: false,
      message: "Invalid user session",
    };
  }

  await connectDB();

  const user = await User.findOne({ _id: decodedToken._id }).exec();

  if (!user) {
    return {
      success: false,
      message: "User does not exist",
    };
  }

  return {
    success: true,
    message: "User fetched",
    data: user,
  };
}

export async function GET() {
  try {
    const userData = await getUserData();
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
