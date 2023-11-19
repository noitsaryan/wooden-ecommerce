import { storage } from "@/appwrite/appwrite.config";
import { ID } from "appwrite";

export const uploadImage = async (file) => {
  try {
    if (!file) return;
    const fileUpload = await storage.createFile(
      "655a5d3abb5e5f5b80cc",
      ID.unique(),
      file
    );
    return fileUpload;
  } catch (error) {
    console.log(error);
  }
};

export const getPreview = async (file_id) => {
  try {
    const result = file_id.map((e) => {
      storage.getFilePreview("655a5d3abb5e5f5b80cc", e);
    });
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};
