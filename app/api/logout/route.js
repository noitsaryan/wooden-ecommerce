import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookie = cookies().has("ashofy-user-session");
        if(!cookie) return NextResponse.json({
            success: true, 
            message: 'Already logged out'
        })        
        cookies().delete("ashofy-user-session")
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