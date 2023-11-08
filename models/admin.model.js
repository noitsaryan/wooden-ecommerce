import { sendMail } from "@/utils/services/mail";
import { compare } from "bcrypt";
import { cookies } from 'next/headers'
import mongoose, { Schema, model, models } from "mongoose";
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
    console.log(admin);
    if (!admin) return "Email does not exists";
    const isTrue = await compare(password, admin.authentication.password);
    console.log(isTrue)
    console.log(password)
    if (!isTrue) return "Password didn't matched";
    sendMail(
      "Authentication Token",
      email,
      `here is you link: http://localhost:3000/admin-panel?token=${token}&topic=statistics`
    );
    admin.authentication.token = token;
    await admin.save();
    cookie.set('__admin_token', token )
    return true;
  } catch (error) {
    return error.message;
  }
}
