import { deleteProduct } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
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