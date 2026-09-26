import fs from "fs";
import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    console.log("Error while uploading image to cloudinary: ", error);
    fs.unlinkSync(localFilePath);
  }
};

export const removeFromCloudinary = async (imageUrl: string) => {
  try {
    const publicId = imageUrl.split("/").pop()?.split(".")[0] as string;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.log("Error while removing image from cloudinary: ", error);
  }
};
