import { getProducts } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getProducts();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}