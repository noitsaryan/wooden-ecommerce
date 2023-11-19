import { deleteSKU } from "@/models/user.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
    await connectDB();

        const {sku_id} = await req.json();
        const response = await deleteSKU(sku_id);
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }
} 