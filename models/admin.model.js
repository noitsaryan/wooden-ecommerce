import { sendMail } from "@/utils/services/mail";
import { compare } from "bcrypt";
import { cookies } from 'next/headers'
import mongoose, { Schema, model, models } from "mongoose";
import { sign } from "jsonwebtoken";
const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    token: {
      type: String,
      required: true,
      select: false,
    },
  },
});

export const Admin = models?.Admin || model("Admin", AdminSchema);

export async function adminLogin(email, password, token) {
  try {
    const cookie = cookies()
    const admin = await Admin.findOne({ email })
      .select("authentication")
      .exec();
    if (!admin) return "Email does not exists";
    const isTrue = await compare(password, admin.authentication.password);
    console.log(password)
    if (!isTrue) return "Password didn't matched";
    sendMail(
      "Authentication Token",
      email,
      `
      You requested an Admin Dashboard access, Click on the following link
      <br/>
      Authentication Link : https://www.ashofy.com/admin-panel?token=${token}&topic=orders`
    );
    admin.authentication.token = token;
    await admin.save();
    const newToken = sign(token, process.env.JWT_KEY)
    cookie.set('__admin_token', newToken)
    return true;
  } catch (error) {
    return error.message;
  }
}
