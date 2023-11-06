import { storage } from "@/appwrite/appwrite.config";
import { ID } from "appwrite";

export const uploadImage = async (file) => {
  try {
    if (!file) return;
    const fileUpload = await storage.createFile(
      "65477266d57cd5b74b8c",
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
      storage.getFilePreview("65477266d57cd5b74b8c", e);
    });
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};
