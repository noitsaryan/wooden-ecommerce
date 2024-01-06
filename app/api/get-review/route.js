import { Review } from "@/models/review.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { index, quantity, sku } = await req.json();
    await connectDB();
    const reviews = await Review.find({sku})
      .skip(index * quantity)
      .limit(quantity)
      .populate("userId")
      .exec();

    if (reviews.length === 0) {   
      return NextResponse.json({
        message: "Review fetching failed.",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Successfully fetched reviews.",
      success: true,
      data: reviews,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
