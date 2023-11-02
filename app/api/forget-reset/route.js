import { changePassword } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {email, token, password} = await req.json();
        if(!email || !token || !password){
            return NextResponse.json({message: 'email, token or password is missing'})
        }
        await connectDB()
        const res = await changePassword(password, token, email);
        return NextResponse.json({res})
    } catch (error) {
        return NextResponse.json(error.message)
    }
}