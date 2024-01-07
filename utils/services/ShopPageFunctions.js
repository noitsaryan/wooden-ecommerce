import axios from "axios";

export const fetchProducts = async (category, index) => {
  const data = await axios.post("/api/get-product-category", {
    type: category,
    index: index || 0,
    quantity: 10,
  });
  return data;
};
