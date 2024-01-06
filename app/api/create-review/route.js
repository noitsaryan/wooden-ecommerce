import { Review } from "@/models/review.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, comment, rating, sku } = await req.json();
    await connectDB();
    const review = await Review.create({
      userId,
      comment,
      sku,
      rating,
    });

    if (!review)
      return NextResponse.json({
        success: false,
        message: "Failed creating review",
      });

    return NextResponse.json({
      success: true,
      message: "Created review successfully",
      data: review,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
