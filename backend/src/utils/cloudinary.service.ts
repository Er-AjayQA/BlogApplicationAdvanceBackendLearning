import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "./cloudinary.helper.js";
import { IFileService } from "./file.interface.js";

export class CloudinaryService implements IFileService {
  async upload(filePath: string): Promise<string> {
    const secure_url = await uploadToCloudinary(filePath);
    return secure_url as string;
  }

  async remove(imageUrl: string): Promise<void> {
    await removeFromCloudinary(imageUrl);
  }
}
