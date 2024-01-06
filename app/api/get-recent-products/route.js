import {getRecentViewedProducts} from "@/models/product.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
       await connectDB();
       const {skus}=await req.json()
       const res=await getRecentViewedProducts(skus)
       return NextResponse.json(res);

    } catch (error) {
       return NextResponse.json({
      message: error.message,
    });
    }
}