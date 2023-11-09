import { getProductsForCard } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET(){
    try {
    const product = await getProductsForCard();
    return NextResponse.json(product)        
    } catch (error) {
        return NextResponse.json({
            message: error.message
        })
    }
}