import mongoose, { models, model, Schema } from "mongoose";
import { User } from "./user.model";

const ReviewSchema = new Schema({
  sku: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  rating: Number,
});

export const Review = models?.Review || model("Review", ReviewSchema);
