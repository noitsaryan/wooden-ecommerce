import mongoose, { Schema, model, models } from "mongoose";
import { Order } from "./order.model";
import { compare, hash } from "bcrypt";
import { sendMail } from "@/utils/services/mail";
import { connectDB } from "@/utils/db";
import randomToken from "random-token";
import { cookies } from "next/headers";

const UserSchema = new Schema(
  {
    name: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
      },
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
        },
        message: "Invalid email address",
      },
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
    address: {
      shipping_address: {
        type: String,
      },
      billing_address: {
        type: String,
      },
    },
    gst_no: {
      type: String,
    },
    phone_no: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Phone must be a 15-digit number.",
      },
    },
    cart: [
      {
        sku: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || model("User", UserSchema);

// Create New User
// Params : Email, Name, Authentication here is an object containing user hashed password and a reset token for account

export const createUser = async (name, authentication, email) => {
  try {
    const user = await User.create({
      name,
      authentication,
      email,
    });
    return user;
  } catch (error) {
    if (error.code === 11000) {
      const message = {
        message: "Email already exists",
        code: error.code,
      };
      return message;
    }

    if (
      error.message === "User validation failed: email: Invalid email address"
    ) {
      const message = {
        message: "Invalid Email Format",
      };
      return message;
    }

    return error.message;
  }
};

// Logging In
// Params : Email & Password for Next Auth Authentication
export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email })
      .select("name email authentication ")
      .exec();

    if (!user) {
      return null;
    }

    const isCorrect = await compare(password, user.authentication.password);

    if (!isCorrect) {
      return null;
    }

    return user;
  } catch (error) {
    return error;
  }
};

// Fetch User by Email Id
// Params : Email, Order is a boolean value which states that whether order section in user is required or not

export const fetchUserByEmailId = async (email, order) => {
  try {
    if (order) {
      const res = await User.findOne({ email }).populate("order").exec();
      return res;
    }
    const res = await User.findOne({ email }).exec();
    if (!res)
      return {
        message: "User not found",
        success: false,
      };
    return {
      message: "User found",
      success: true,
      data: res,
    };
  } catch (error) {
    return error.message;
  }
};

// Reset user password with previous password
// Params : Email, Existing Password, and New Password

export const resetUserPasswordWithPassword = async (
  email,
  existing_password,
  new_password
) => {
  try {
    const auth = await User.findOne({ email }).select("authentication").exec();
    if (!auth) {
      return null;
    }
    const isCorrectPassword = await compare(
      existing_password,
      auth.authentication.password
    );
    console.log(isCorrectPassword);
    if (!isCorrectPassword) {
      return "Password did not matched!";
    }
    const newPassword = await hash(new_password, 10);
    auth.authentication.password = newPassword;
    await auth.save();
    return auth;
  } catch (error) {
    return error.message;
  }
};

// Updating Functions
//  Parametre should follow the conventions as mentioned inside function

export const update = async (email, userData, type, cartType) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return "User does not exists";
    }
    if (type === "name") {
      // Syntax for params => { first_name: String, last_name: String }
      user.name = userData;
    } else if (type === "address") {
      // Syntax for params => { shipping_address: String, billing_address: String }
      user.address = userData;
    } else if (type === "phone") {
      // Syntax for params => Number (Must be 10 digits)
      user.phone_no = userData;
    } else if (type === "gst") {
      // Syntax for params => Number (Must be 15 digits)
      user.gst_no = userData;
    } else if (type === "cart") {
      // Syntax for params => { sku: String }
      user.cart.push(userData);
      if (cartType === "array") {
        user.cart = userData;
      }
    }
    await user.save();
    return "Success";
  } catch (error) {
    return error.message;
  }
};

// Delete Account Function
// Params : email id

export const deleteAccount = async (email) => {
  try {
    const user = await User.deleteOne({ email }).exec();
    if (!user) {
      return "User does not exists!";
    }
    return user;
  } catch (error) {
    return error.message;
  }
};

// Forget Account Function
// Params : email id

// Step 1
// Params: Authenticating User

export const authenticateUser = async (email) => {
  try {
    const user = await User.findOne({ email }).select("authentication").exec();
    if (!user) {
      return "Email does not exists";
    }
    const token = user?.authentication?.token;
    const link = `https://www.ashofy.com/reset?token_id=${token}&user=${email}`;
    const subject = `Password Reset Link | Ashofy`;
    const html = `
    You requested a password reset link:
    <br/>
    <b>Follow this link: ${link}</b>`;
    await sendMail(subject, email, html);
    return "Mail Sent";
  } catch (error) {
    return error.message;
  }
};

// Step 2
// Params: New Password

export const changePassword = async (new_password, token, email) => {
  try {
    await connectDB();
    const user = await User.findOne({ email }).select("authentication").exec();
    if (!user) {
      return "No user";
    }
    if (user?.authentication?.token !== token) {
      return "Token Mismatch!";
    }
    const hashed = await hash(new_password, 10);
    user.authentication.password = hashed;
    user.authentication.token = randomToken(16);
    await user.save();
    return user;
  } catch (error) {
    return error.message;
  }
};

// Updating Order Id
// Params : order_id => order > _id from order schema & user_id is user > _id from user schema
export const deleteSKU = async (sku_id) => {
  try {
    const user = await User.findOneAndUpdate(
      { "cart._id": sku_id },
      { $pull: { cart: { _id: sku_id } } },
      { new: true }
    );

    if (!user) {
      // If no user found with the provided SKU ID
      return "User not found or SKU not in user's cart.";
    }

    // The user object here will contain the updated user document
    return "Success";
  } catch (error) {
    return error.message;
  }
};
