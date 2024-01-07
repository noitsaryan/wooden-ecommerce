import { createUser } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import randomToken from "random-token";
import { hash } from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const { name, password, email } = await req.json();

    if (!name || !password || !email) {
      return NextResponse.json({
        message: "Name, authentication or email is missing",
      });
    }

    if (password.length < 8) {
      return NextResponse.json({
        message: "Password should not be less than 8 characters",
      });
    }

    const token = randomToken(18);

    const hashed = await hash(password, 10);

    const authentication = {
      password: hashed,
      token,
    };

    const res = await createUser(name, authentication, email);


    if (!res.success) {
      return NextResponse.json({
        success: false,
        message: res.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
