import { deleteProduct } from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
    await connectDB();

        const {sku} = await req.json();
        if(!sku) {
            return NextResponse.json('sku is missing!')
        }
        const res = await deleteProduct(sku)
        return NextResponse.json({message:res})
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}