import { getAllOrdersWithUser } from "@/models/order.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const res = await getAllOrdersWithUser();
        return NextResponse.json({
            data:res
        })
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
} 