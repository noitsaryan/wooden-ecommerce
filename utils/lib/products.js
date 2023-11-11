import axios from "axios";

export async function createProduct(
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
) {
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
      size,
      warranty,
      maintenance,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
export async function updateProduct(
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
) {
  try {

    const res = await axios.put("/api/update-product", {
      title,
      price,
      description,
      specification,
      color,
      images,
      sku,
      size,
      warranty,
      maintenance,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
export async function deleteProduct(sku) {
  try {
    const res = await axios.post("/api/delete-product", {
      sku,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
