import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    maxLength: 10,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
  },
  specification: {
    type: Object,
  },
  variation: {
    color: {
      type: Array,
    },
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  subCategory: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

export const Product = models?.Product || model("Product", ProductSchema);

// Utility Functions

export const createProduct = async (
  title,
  price,
  sku,
  description,
  specification,
  color,
  images,
  category,
  subCategory
) => {
  try {
    const variation = {
      color,
    };

    const check = await Product.findOne({ sku });

    if (check) {
      return "Product with the same SKU already exists.";
    }

    const product = await Product.create({
      title,
      price,
      sku,
      description,
      specification,
      variation,
      images,
      category,
      subCategory,
    });
    return product;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (sku) => {
  try {
    await Product.findOneAndDelete({ sku }).select("sku").exec();
    return "Product deleted successfully!";
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (
  title,
  price,
  description,
  specification,
  color,
  images,
  sku
) => {
  try {
    const product = await Product.findOne({ sku }).exec();
    if(!product) {
        return 'Product does not exists!'
    }
    const variation = {
        color
    }
    product.title = title,
    product.price = price,
    product.description = description
    product.specification = specification
    product.variation = variation
    product.images = images
    await product.save();
    return product
  } catch (error) {
    return error.message;
  }
};
