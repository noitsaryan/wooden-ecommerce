import { connectDB } from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    await connectDB();

        const cookie = cookies()
        const data = cookie.delete('__admin_token')
        return NextResponse.json({data})
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}