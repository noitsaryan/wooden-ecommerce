import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookie = cookies().has("user");
        if(!cookie) return NextResponse.json({
            success: true, 
            message: 'Already logged out'
        })        
        cookies().delete("user")
        return NextResponse.json({
            success: true, 
            message: 'Logged out successfully'
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}