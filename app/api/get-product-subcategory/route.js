import { getProductByCategory } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {type} = await req.json()
        const res = await getProductByCategory(type)
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }
}