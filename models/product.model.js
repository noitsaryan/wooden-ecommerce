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
    type: Array,
  },
  variation: {
    color: {
      type: Array,
    },
    size: {
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
  warranty: {
    type: String,
  },
  maintenance: {
    type: String,
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
  subCategory,
  size,
  warranty,
  maintenance
) => {
  try {
    const variation = {
      color,
      size,
    };

    if (!title) {
      return "title is missing";
    }
    if (!price) {
      return "price is missing";
    }
    if (!sku) {
      return "sku is missing";
    }
    if (!description) {
      return "description is missing";
    }
    if (!specification) {
      return "specification is missing";
    }
    if (!color) {
      return "color is missing";
    }
    if (!images) {
      return "images is missing";
    }
    if (!category) {
      return "category is missing";
    }
    if (!subCategory) {
      return "subCategory is missing";
    }
    if (!size) {
      return "images is missing";
    }
    if (!warranty) {
      return "category is missing";
    }
    if (!maintenance) {
      return "subCategory is missing";
    }

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
      warranty,
      maintenance,
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
  sku,
  size,
  warranty,
  maintenance
) => {
  try {
    const product = await Product.findOne({ sku }).exec();
    if (!product) {
      return "Product does not exists!";
    }
    const variation = {
      color,
      size,
    };
    product.title = title;
    product.price = price;
    product.description = description;
    product.specification = specification;
    product.variation = variation;
    product.images = images;
    product.maintenance = maintenance;
    product.warranty = warranty;

    await product.save();
    return product;
  } catch (error) {
    return error.message;
  }
};

export async function getProducts(index = 0, quantity = 10) {
  try {
    const products = await Product.find()
      .skip(index * quantity)
      .limit(quantity)
      .sort({ _id: -1 })
      .exec();
    return products;
  } catch (error) {
    return error.message;
  }
}

export async function getProductsForCard(index = 0, quantity = 8) {
  try {
    const products = await Product.find()
      .skip(index * quantity)
      .limit(quantity)
      .select("title price sku images category subCategory")
      .sort({ _id: -1 })
      .exec();
    return products;
  } catch (error) {
    return error.message;
  }
}

export async function getProductByCategory(type) {
  try {
    const product = await Product.find({ subCategory: type })
      .select("title price sku images")
      .exec();
    return product;
  } catch (error) {
    return error.message;
  }
}

export async function getProductByMainCategory(type, index = 0, quantity = 10) {
  try {
    const product = await Product.find({ category: type })
      .skip(index * quantity)
      .limit(quantity)
      .select("title price sku images")
      .sort({ _id: -1 })
      .exec();
    return product;
  } catch (error) {
    return error.message;
  }
}

export async function getProductBySKU(sku) {
  try {
    const product = await Product.findOne({ sku }).exec();
    return product;
  } catch (error) {
    return error.message;
  }
}

export async function getRecentViewedProducts(skus) {
  try {
    const products = await Product.find({ sku: { $in: skus } }).exec();
    return products;
  } catch (error) {
    return error.message;
  }
}
