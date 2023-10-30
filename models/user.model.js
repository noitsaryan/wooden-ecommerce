import mongoose, { Schema, model, models } from "mongoose";
import { Order } from "./order.model";
import { compare, hash } from "bcrypt";

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
      type: Number,
      validate: {
        validator: function (v) {
          return /^[0-9]{15}$/.test(v);
        },
        message: "GST must be a 15-digit number.",
      },
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
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
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
    return res;
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

export const update = async (email, userData, type) => {
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
    }
    await user.save();
    return user;
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
      const user = await User.findOne({email}).select('email').exec();
      if(!user) {
        return 'Email does not exists'
      }
  } catch (error) {
    return error.message;
  }
};

// Step 2
// Params: New Password

export const changePassword = async (new_password) => {};

// Updating Order Id
// Params : order_id => order > _id from order schema & user_id is user > _id from user schema

export const updateOrderId = async (order_id, user_id) => {
  try {
    const userId = new mongoose.Types.ObjectId(user_id);

    const updateOrder = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          order: order_id,
        },
      }
    );

    return updateOrder;
  } catch (error) {
    return error.message;
  }
};
