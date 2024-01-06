import { Review } from "@/models/review.model";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { _id, userId } = await req.json();
    await connectDB();
    const deleteReview = await Review.findOneAndDelete({ _id, userId }).exec();
    
    if (!deleteReview) {
      return NextResponse.json({
        message: "Deletion of review failed",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Successfully deleted review.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
