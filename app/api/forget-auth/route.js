import { authenticateUser } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {email} = await req.json();
        if(!email){
            return NextResponse.json({message: 'email is missing'})
        }
        await connectDB()
        const res = await authenticateUser(email);
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}