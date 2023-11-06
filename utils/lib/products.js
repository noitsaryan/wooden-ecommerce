import axios from "axios";

export async function createProduct() {
  try {
    const res = await axios.post("/api/create-product", {
      title,
      price,
      sku,
      description,
      specification,
      color,
      images,
      category,
      subCategory,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
export async function updateProduct() {
  try {
    const res = await axios.post("/api/update-product", {
      title,
      price,
      description,
      specification,
      color,
      images,
      sku,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
export async function deleteProduct() {
  try {
    const res = await axios.post("/api/delete-product", {
      sku,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
