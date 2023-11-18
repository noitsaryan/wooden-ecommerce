import { getProductByMainCategory } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
    await connectDB();

        const {type} = await req.json()
        const res = await getProductByMainCategory(type)
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }
}