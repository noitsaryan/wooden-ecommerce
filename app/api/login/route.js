import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({
        message: "Email or Password missing",
        success: false,
      });

    await connectDB();
    const user = await User.findOne({
      email,
    })
      .select("authentication name email")
      .exec();

    if (!user)
      return NextResponse.json({
        message: "Email does not exists",
        success: false,
      });

    const authorize = await compare(password, user.authentication.password);

    if (!authorize)
      return NextResponse.json({
        message: "Password is incorrect.",
        success: false,
      });

    const session = {
      name: user.name,
      email: user.email,
      _id: user._id.toString(),
    };

    const jwt = sign(session, process.env.JWT_KEY);

    cookies().set("ashofy-user-session", jwt, {
      maxAge: 6 * 60 * 60,
    });

    return NextResponse.json({
      message: "Session created. User logged in ",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
